import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues, TemplateResult } from "lit";
import { pickText } from "ha-dashboard-kit/config";
import type { LocalizedText } from "ha-dashboard-kit/config";
import { hintStyles } from "ha-dashboard-kit/controls";
import type { TileState } from "ha-dashboard-kit/controls";
import { entityState, isNoValue, readNumber, readText } from "ha-dashboard-kit/entities";
import { HoldOrDoubleTap } from "ha-dashboard-kit/gesture";
import { fitJoined, joined, joinedStyles, joinedText } from "ha-dashboard-kit/joined";
import { RunStarts } from "ha-dashboard-kit/runstart";
import { Pending } from "ha-dashboard-kit/pending";
import type { PendingCommand } from "ha-dashboard-kit/pending";
import { normalizeConfig } from "./config";
import { cardLanguage, getI18n } from "./i18n";
import type { I18n } from "./i18n";
import { styles } from "./styles";
import type { HomeAssistant, Named, Preset, Settings } from "./types";
import { logRows, logTime, shortNames } from "./log";
import type { LogEntry, LogRow } from "./log";

const SEEN_KEY = "dum-dashboard.log-seen";

/** The time „Co se stalo“ was last closed on this device; 0 when unknown (storage blocked or empty). */
function readSeen(): number {
  try {
    return Number(localStorage.getItem(SEEN_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeSeen(value: number): void {
  try {
    localStorage.setItem(SEEN_KEY, String(value));
  } catch {
    /* no storage: the journal shows everything as new */
  }
}

/** One failed action of the automations (`polozky` of sensor.dum_nesplnene_akce). */
interface Failed {
  entita: string;
  akce?: string;
  duvod?: string;
  cas?: string;
  cil?: unknown;
}

const ICON_BATTERY = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`;

const ICON_FILTER = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 8v8M12 8v8M16 8v8"></path></svg>`;

const ICON_LAUNDRY = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5"></rect><circle cx="12" cy="13" r="4.5"></circle><path d="M7.5 6.5h2" stroke-linecap="round"></path></svg>`;

const ICON_MAINTENANCE = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.6-.6-2.6z"></path></svg>`;

/**
 * Dům: the control centre of the house (CURRENT_SPEC.md of the card). The first screen: what needs the user, what
 * runs now, and the controls by group. Everything that switches something on this screen is protected against a tap
 * by mistake (hold or double tap); a tile with a chevron only opens the detail of its device.
 */
export class HaDumDashboard extends LitElement {
  static styles = [hintStyles, joinedStyles, styles];

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: Settings;
  @state() private _error = "";
  @state() private _hint?: string;
  @state() private _now = Date.now();
  /** The open detail (a sheet from the bottom). */
  @state() private _detail?: "covers" | "heating" | "cooling" | "log";
  /** Today's entries of the logbook of Home Assistant for the entities of the card („Co se stalo“). */
  @state() private _log?: LogEntry[];
  /** Position and tilt of each blind through today (recorder), to say the preset of a row of the journal. */
  private coverHistory: Record<string, { time: number; position: number; tilt: number }[]> = {};
  /** When the person last saw „Co se stalo“ (this device); entries after it are new. */
  @state() private _seen = readSeen();
  private logTimer?: number;
  /** Commands on their way: the control pulses until Home Assistant reports the result (spec kitu, Odezva). */
  private readonly pending = new Pending(() => this.requestUpdate());
  /** The rooms the popup Topení / Klimatizace opened with (the tile that was tapped). */
  @state() private _climateSelected: string[] = [];
  /** The row whose menu "Odložit" is open. */
  @state() private _menu?: string;

  private timer?: number;
  /** What moves the texts from parts: the width of the card and a loaded font (fitJoined). */
  @state() private _fit = "";
  private resize?: ResizeObserver;
  private hintTimer?: number;
  /** Since when the running things run: from the recorder, so a restart of Home Assistant does not start the durations again. */
  private readonly starts = new RunStarts(() => this.requestUpdate());
  private readonly gesture = new HoldOrDoubleTap(() => ({
    holdMs: this._config?.guard.holdMs ?? 550,
    doubleTapMs: this._config?.guard.doubleTapMs ?? 400,
  }));

  setConfig(config: unknown): void {
    this._config = normalizeConfig(config);
  }

  getCardSize(): number {
    return 12;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // The durations ("Pračka 42 min") move without any change of an entity.
    this.timer = window.setInterval(() => (this._now = Date.now()), 30000);
    window.addEventListener("pointerdown", this.closeMenu);
    window.addEventListener("keydown", this.closeMenu);
    this.resize = new ResizeObserver(() => (this._fit = `${Math.round(this.getBoundingClientRect().width)}|${this._fit.split("|")[1] ?? ""}`));
    this.resize.observe(this);
    void document.fonts?.ready.then(() => (this._fit = `${this._fit.split("|")[0] ?? ""}|${document.fonts.size}`));
    // The logbook every 5 minutes (the count of the new entries on the first screen); at once when „Co se stalo“ opens.
    this.logTimer = window.setInterval(() => void this.loadLog(), 5 * 60000);
  }

  protected updated(changed: PropertyValues): void {
    fitJoined(this.renderRoot, this._fit);
    // The texts in a sheet are laid out only once the sheet has drawn its frame.
    if (changed.has("_detail") && this._detail) {
      const sheet = this.renderRoot.querySelector("dd-sheet") as (Element & { updateComplete?: Promise<unknown> }) | null;
      void sheet?.updateComplete?.then(() => fitJoined(this.renderRoot, this._fit));
    }
  }

  /** A tap outside the open menu "Odložit", or Escape, closes it. */
  private closeMenu = (event: Event): void => {
    if (!this._menu) return;
    if (event instanceof KeyboardEvent ? event.key === "Escape" : !event.composedPath().some((node) => node instanceof Element && node.classList.contains("snooze"))) {
      this._menu = undefined;
    }
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    window.clearInterval(this.logTimer);
    this.pending.clear();
    window.clearTimeout(this.hintTimer);
    window.removeEventListener("pointerdown", this.closeMenu);
    window.removeEventListener("keydown", this.closeMenu);
    this.resize?.disconnect();
    this.gesture.dispose();
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass")) {
      this.toggleAttribute("data-light", this.hass?.themes?.darkMode === false);
      this._now = Date.now();
      if (!changed.get("hass")) void this.loadLog();
      this.pending.check(this.hass);
    }
  }

  private get i18n(): I18n {
    return getI18n(cardLanguage(this._config?.language ?? "auto", this.hass), this.hass);
  }

  private name(value: LocalizedText): string {
    return pickText(value, this.i18n.language) ?? "";
  }

  render(): TemplateResult | typeof nothing {
    const config = this._config;
    if (!config) return nothing;
    const i18n = this.i18n;
    const summer = config.houseMode !== undefined && readText(this.hass, config.houseMode) === config.summer;
    const climate = summer ? [this.renderCooling(config, i18n), this.renderHeating(config, i18n)] : [this.renderHeating(config, i18n), this.renderCooling(config, i18n)];
    return html`<ha-card>
      ${this.renderQueue(config, i18n)} ${this.renderRunning(config, i18n)} ${this.renderCovers(config, i18n)}
      ${this.renderVentilation(config, i18n)} ${climate} ${this.renderDevices(config, i18n)} ${this.renderLogRow(config, i18n)}
      ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : nothing}
    </ha-card>
    ${this.renderCoversDetail(config, i18n)} ${this.renderClimate(config, i18n)} ${this.renderLog(config, i18n)}`;
  }

  /* ---------- Co se stalo ---------- */

  /** The entities the card shows or switches: what happened to them today is the journal (uživatel 13. 11. 2026: „Q212 a“). */
  private logEntities(config: Settings): string[] {
    return [
      ...config.covers.entities,
      ...(config.ventilation.mode ? [config.ventilation.mode] : []),
      ...config.ventilation.fans.map((item) => item.entity),
      ...config.heating.rooms.map((item) => item.entity),
      ...config.cooling.rooms.map((item) => item.entity),
      ...config.running.map((item) => item.entity),
      ...config.laundry.map((item) => item.entity),
    ];
  }

  private async loadLog(): Promise<void> {
    const config = this._config;
    const hass = this.hass;
    if (!config || !hass?.callWS) return;
    const entities = this.logEntities(config);
    if (!entities.length) return;
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    try {
      const rows = await hass.callWS<LogEntry[]>({ type: "logbook/get_events", start_time: midnight.toISOString(), entity_ids: entities });
      await this.loadCoverHistory(config, midnight);
      this._log = Array.isArray(rows) ? rows : [];
    } catch {
      // A failed refresh keeps what was loaded; only a journal that never loaded says so.
    }
  }

  private async loadCoverHistory(config: Settings, midnight: Date): Promise<void> {
    if (!config.covers.entities.length || !this.hass) return;
    try {
      type Row = { s?: string; a?: Record<string, unknown>; lu?: number; lc?: number };
      const answer = await this.hass.callWS<Record<string, Row[]>>({
        type: "history/history_during_period",
        start_time: midnight.toISOString(),
        entity_ids: config.covers.entities,
        include_start_time_state: true,
        significant_changes_only: false,
        minimal_response: false,
        no_attributes: false,
      });
      const history: typeof this.coverHistory = {};
      for (const [id, rows] of Object.entries(answer ?? {})) {
        let last: { position: number; tilt: number } | undefined;
        history[id] = (Array.isArray(rows) ? rows : []).flatMap((row) => {
          // A row without attributes repeats the last ones (compressed history).
          const position = Number(row.a?.current_position ?? last?.position);
          const tilt = Number(row.a?.current_tilt_position ?? last?.tilt);
          const time = Number(row.lu ?? row.lc) * 1000;
          if (!Number.isFinite(position) || !Number.isFinite(tilt) || !Number.isFinite(time)) return [];
          last = { position, tilt };
          return [{ time, position, tilt }];
        });
      }
      this.coverHistory = history;
    } catch {
      // Without the recorder the journal says the state („Zavřeno“).
    }
  }

  /** The preset a blind was in at `time` (from the recorder), or undefined. */
  private presetAt(config: Settings, id: string, time: number): Preset | undefined {
    const rows = this.coverHistory[id] ?? [];
    let at: { position: number; tilt: number } | undefined;
    // Its position a moment after the entry: the end position and the tilt come in the same second or just after.
    for (const row of rows) if (row.time <= time + 5000) at = row;
    if (!at) return undefined;
    return config.covers.presets.find((preset) => Math.abs(at!.position - preset.position) <= config.covers.tolerance && Math.abs(at!.tilt - preset.tilt) <= config.covers.tolerance);
  }

  /** Which entities are one kind: one action on several of them is one row. */
  private logKind(config: Settings): (entity: string) => string {
    const kinds = new Map<string, string>();
    config.covers.entities.forEach((entity) => kinds.set(entity, "covers"));
    [config.ventilation.mode, ...config.ventilation.fans.map((item) => item.entity)].forEach((entity) => entity && kinds.set(entity, "ventilation"));
    config.heating.rooms.forEach((item) => kinds.set(item.entity, "heating"));
    config.cooling.rooms.forEach((item) => kinds.set(item.entity, "cooling"));
    return (entity) => kinds.get(entity) ?? "";
  }

  /** Pračka, sušička, myčka in words („Sušička · Doběhla“), not their helpers („Sušička běží · Vypnuto“). */
  private logTitle(config: Settings, entry: LogEntry, state: string, i18n: I18n): string {
    const t = i18n.t;
    const running = config.running.find((item) => item.entity === entry.entity_id);
    if (running) return `${this.name(running.name)} · ${state === "on" ? t.logRuns : t.logFinished}`;
    const laundry = config.laundry.find((item) => item.entity === entry.entity_id);
    if (laundry) return `${this.name(laundry.name)} · ${state === "on" ? t.logLaundryWaits : t.logLaundryOut}`;
    return `${this.logName(entry)} · ${this.logState(entry, state)}`;
  }

  /**
   * The reason of a blind when the logbook has none: the helper of the last action of each blind says who sent it
   * (the same source as the detail of the blinds), when its time is just before the entry.
   */
  private coverReason(config: Settings, row: LogRow, i18n: I18n): string {
    if (row.reason || row.kind !== "covers") return row.reason === "app" ? i18n.t.who.aplikace : row.reason;
    const items = entityState(this.hass, config.covers.lastAction)?.attributes.polozky as Record<string, { kdo?: unknown; cas?: unknown }> | undefined;
    const last = items && typeof items === "object" ? items[row.entries[0].entity_id] : undefined;
    const time = typeof last?.cas === "string" ? Date.parse(last.cas) : NaN;
    if (!last || typeof last.kdo !== "string" || !(time <= row.time && row.time - time <= 3 * 60000)) return "";
    return i18n.t.who[last.kdo] ?? last.kdo;
  }

  /** „Sušička - konec cyklu“ under „Sušička · Doběhla“ says the name twice: the reason without it („Konec cyklu“). */
  private withoutName(reason: string, row: LogRow, config: Settings): string {
    const entity = row.entries[0].entity_id;
    const item = [...config.running, ...config.laundry].find((other) => other.entity === entity);
    const name = item ? this.name(item.name) : this.logName(row.entries[0]);
    if (!reason.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())) return reason;
    const rest = reason.slice(name.length).replace(/^[\s\-–—·:]+/, "");
    return rest ? rest.charAt(0).toLocaleUpperCase() + rest.slice(1) : reason;
  }

  private logName(entry: LogEntry): string {
    const entity = entityState(this.hass, entry.entity_id);
    return entry.name || (typeof entity?.attributes.friendly_name === "string" ? entity.attributes.friendly_name : entry.entity_id);
  }

  private logState(entry: LogEntry, state: string): string {
    const preset = state.startsWith("preset:") ? this._config?.covers.presets[Number(state.slice(7))] : undefined;
    if (preset) return this.name(preset.name);
    const hass = this.hass as (HomeAssistant & { formatEntityState?: (stateObj: unknown, state?: string) => string }) | undefined;
    const entity = entityState(this.hass, entry.entity_id);
    return entity && hass?.formatEntityState ? hass.formatEntityState(entity, state) : state;
  }

  /** A blind in the journal says its preset („Žaluzie · Tma“, uživatel 13. 11. 2026: „Q220 zatím A“), else its state. */
  private logRows(config: Settings): LogRow[] {
    const entries = (this._log ?? []).map((entry) => {
      if (!config.covers.entities.includes(entry.entity_id) || ["opening", "closing"].includes(String(entry.state))) return entry;
      const preset = this.presetAt(config, entry.entity_id, logTime(entry));
      return preset ? { ...entry, state: `preset:${config.covers.presets.indexOf(preset)}` } : entry;
    });
    return logRows(entries, this.logKind(config));
  }

  private renderLogRow(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!this.logEntities(config).length) return nothing;
    const t = i18n.t;
    const fresh = this.logRows(config).filter((row) => row.time > this._seen).length;
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    // Seen before today (or never): the journal starts at midnight, so the count is of today.
    const today = this._seen < midnight.getTime();
    const detail = this._log === undefined ? "" : !fresh ? t.logNothingNew : today ? t.logToday(fresh) : t.logNew(fresh, i18n.time(this._seen));
    return html`<div class="group" data-part="log">
      <button class="row link-row" type="button" aria-haspopup="dialog" @click=${() => this.openLog()}>
        <span class="main">${t.log}${detail ? html`<small>${detail}</small>` : nothing}</span>
        <span class="chevron-mark" aria-hidden="true">›</span>
      </button>
    </div>`;
  }

  private openLog(): void {
    this._detail = "log";
    void this.loadLog();
  }

  private closeLog(): void {
    this._detail = undefined;
    // What was open is seen now (this device).
    this._seen = Date.now();
    writeSeen(this._seen);
  }

  private renderLog(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!this.logEntities(config).length) return nothing;
    const t = i18n.t;
    const open = this._detail === "log";
    const entries = this.logRows(config);
    const fresh = entries.filter((row) => row.time > this._seen);
    const earlier = entries.filter((row) => row.time <= this._seen);
    const kinds: Record<string, string> = { covers: t.covers, ventilation: t.ventilation, heating: t.heating, cooling: t.cooling };
    const rows = (list: LogRow[]) =>
      list.map((row) => {
        const reason = this.withoutName(this.coverReason(config, row, i18n), row, config);
        const group = row.entries.length > 1;
        const title = group ? `${kinds[row.kind] ?? ""} · ${this.logState(row.entries[0], row.state)}` : this.logTitle(config, row.entries[0], row.state, i18n);
        return html`<div class="log-row"><span class="log-time">${i18n.time(row.time)}</span><span class="main"
            >${title}${group ? html`<span class="log-members">${shortNames(row.entries.map((entry) => this.logName(entry))).join(", ")}</span>` : nothing}${reason
              ? html`<small>${reason}</small>`
              : nothing}</span
          ></div>`;
      });
    return html`<dd-sheet .open=${open} .heading=${t.log} .closeLabel=${t.close} @hdk-close=${() => this.closeLog()}>
      ${open
        ? html`<div class="detail" data-part="log-detail">
            ${this._log === undefined
              ? html`<p class="log-empty">${t.logFailed}</p>`
              : entries.length
                ? html`${fresh.length ? html`<h3>${t.logSince}</h3>${rows(fresh)}` : nothing}${earlier.length ? html`<h3>${t.logEarlier}</h3>${rows(earlier)}` : nothing}`
                : html`<p class="log-empty">${t.logEmpty}</p>`}
          </div>`
        : nothing}
    </dd-sheet>`;
  }

  /* ---------- Potřebuje tebe ---------- */

  private failed(config: Settings): Failed[] {
    const items = entityState(this.hass, config.failedActions)?.attributes.polozky;
    return Array.isArray(items) ? items.filter((item): item is Failed => typeof item === "object" && item !== null && typeof (item as Failed).entita === "string") : [];
  }

  private renderQueue(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!config.failedActions && !config.batteries.length && !config.filters.length && !config.laundry.length && !config.maintenance.length) return nothing;
    const t = i18n.t;
    const failed = this.failed(config);
    const snoozed = this.snoozed(config);
    const low = config.batteries.filter((battery) => readText(this.hass, battery.low) === "on" && !snoozed.has(`battery:${battery.low}`));
    const dirty = this.dirtyFilters(config).filter(({ filter }) => !snoozed.has(`filter:${filter.hours}`));
    // Laundry cannot wait a week: only „Hotovo“, no „Odložit“ (uživatel 13. 11. 2026).
    const waiting = config.laundry.filter((item) => readText(this.hass, item.entity) === "on");
    // Maintenance after its number of cycles; a counter without a value is no task.
    const due = config.maintenance.flatMap((item) => {
      const cycles = readNumber(this.hass, item.counter);
      return cycles !== undefined && cycles >= item.every && !snoozed.has(`maintenance:${item.counter}`) ? [{ item, cycles }] : [];
    });
    const count = failed.length + low.length + dirty.length + waiting.length + due.length;
    const rows = [
      ...failed.map((item) => {
        // The whole name of Home Assistant („Žaluzie Maxík“); without it the name from the detail of the blinds, never the ID.
        const configured = config.covers.names[item.entita];
        const ha = entityState(this.hass, item.entita)?.attributes.friendly_name;
        const friendly = typeof ha === "string" ? ha : configured !== undefined ? this.name(configured) : undefined;
        const time = item.cas ? Date.parse(item.cas) : NaN;
        // The reason and the time; without a reason the action that failed.
        // The reason comes from Home Assistant in lower case; it starts the line like every other detail.
        // A blind that did not arrive says where it should have gone („Nedojela do Tma“, „Q219 A“); numbers only
        // when the target is no preset.
        const goal = this.failedGoal(config, item);
        const reason = goal ? t.notArrivedTo(this.name(goal.name)) : item.duvod || item.akce;
        const detail = joined([reason ? reason.charAt(0).toLocaleUpperCase(i18n.language) + reason.slice(1) : undefined, Number.isFinite(time) ? i18n.time(time) : undefined].filter(Boolean));
        const retry = this.retryOf(config, item);
        return html`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${typeof friendly === "string" ? friendly : item.entita}<small>${detail}</small></span>
          ${retry
            ? html`<button class="button small ${this.pending.has(`retry:${item.entita}`) ? "pending" : ""}" type="button" aria-busy=${this.pending.has(`retry:${item.entita}`) ? "true" : nothing} @click=${retry}>${t.retry}</button>`
            : config.clearFailed
              ? html`<button class="button" type="button" @click=${() => this.call("script", config.clearFailed!.split(".")[1], { entita: item.entita })}>${t.done}</button>`
              : nothing}
        </div>`;
      }),
      ...low.map((battery) => {
        const level = readNumber(this.hass, battery.level);
        const type = readText(this.hass, battery.type);
        const detail = joined([t.battery(level === undefined ? undefined : i18n.percent(Math.round(level))), type].filter(Boolean));
        return html`<div class="row" data-row="battery">
          <span class="mark">${ICON_BATTERY}</span>
          <span class="main">${this.name(battery.name)}<small>${detail}</small></span>
          ${this.snoozeButton(config, `battery:${battery.low}`, i18n)}
        </div>`;
      }),
      ...dirty.map(({ filter, hours, threshold }) => {
        const h = (value: number) => `${i18n.whole(Math.floor(value))} h`;
        return html`<div class="row two" data-row="filter">
          <span class="mark">${ICON_FILTER}</span>
          <span class="main">${this.name(filter.name)}<small>${joinedText(t.filter(h(hours), h(threshold)))}</small></span>
          <span class="actions">
            ${this.snoozeButton(config, `filter:${filter.hours}`, i18n)}
            <button class="button" type="button" @click=${() => this.call("input_number", "set_value", { entity_id: filter.hours, value: 0 })}>${t.done}</button>
          </span>
        </div>`;
      }),
      ...due.map(({ item, cycles }) => html`<div class="row two" data-row="maintenance">
        <span class="mark">${ICON_MAINTENANCE}</span>
        <span class="main">${this.name(item.name)}<small>${joined([this.name(item.task), t.cycles(cycles, item.every)])}</small></span>
        <span class="actions">
          ${this.snoozeButton(config, `maintenance:${item.counter}`, i18n)}
          <button class="button" type="button" @click=${() => this.call("counter", "reset", { entity_id: item.counter })}>${t.done}</button>
        </span>
      </div>`),
      ...waiting.map((item) => {
        // Since when it waits: from the recorder, so a restart of Home Assistant does not move it.
        const start = this.starts.of(this.hass, item.entity);
        const today = start !== undefined && new Date(start).toDateString() === new Date(this._now).toDateString();
        const since = start === undefined ? "" : today ? i18n.time(start) : i18n.day(start);
        return html`<div class="row" data-row="laundry">
          <span class="mark">${ICON_LAUNDRY}</span>
          <span class="main">${this.name(item.name)}<small>${joinedText(t.laundry(since))}</small></span>
          <button class="button" type="button" @click=${() => this.call("input_boolean", "turn_off", { entity_id: item.entity })}>${t.done}</button>
        </div>`;
      }),
    ];
    return html`<h2><span>${count ? `${t.needsYou} · ${count}` : t.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${rows.length ? rows : html`<div class="row"><span class="main">${t.nothingWaits}</span></div>`}
      </div>`;
  }

  /** Air conditioners that ran at least their threshold since the filter was cleaned; a missing value is no task. */
  private dirtyFilters(config: Settings): Array<{ filter: Settings["filters"][number]; hours: number; threshold: number }> {
    return config.filters.flatMap((filter) => {
      const hours = readNumber(this.hass, filter.hours);
      const threshold = readNumber(this.hass, filter.threshold);
      return hours !== undefined && threshold !== undefined && threshold > 0 && hours >= threshold ? [{ filter, hours, threshold }] : [];
    });
  }

  /* ---------- Odložit ---------- */

  private day(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  /** The keys of the items postponed to a later day than today. */
  private snoozed(config: Settings): Set<string> {
    const items = entityState(this.hass, config.snoozed)?.attributes.polozky;
    const today = this.day(new Date(this._now));
    const keys = new Set<string>();
    if (Array.isArray(items)) {
      for (const item of items as Array<{ klic?: unknown; do?: unknown }>) {
        if (typeof item?.klic === "string" && typeof item.do === "string" && item.do > today) keys.add(item.klic);
      }
    }
    return keys;
  }

  /** "Odložit" with its menu (a day, to the weekend, a week, a month; without a time, it is no alarm). The menu only covers what is under it. */
  private snoozeButton(config: Settings, key: string, i18n: I18n): TemplateResult | typeof nothing {
    if (!config.snoozed || !config.snoozeScript) return nothing;
    const t = i18n.t;
    const now = new Date(this._now);
    const plus = (days: number) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + days);
    const toSaturday = (6 - now.getDay() + 7) % 7 || 7;
    const month = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const choices: Array<[string, Date]> = [[t.snoozeFor.day, plus(1)], [t.snoozeFor.weekend, plus(toSaturday)], [t.snoozeFor.week, plus(7)], [t.snoozeFor.month, month]];
    const open = this._menu === key;
    const choose = (until: Date) => {
      this._menu = undefined;
      this.call("script", config.snoozeScript!.split(".")[1], { klic: key, do: this.day(until) });
    };
    return html`<span class="snooze">
      <button class="button" type="button" aria-haspopup="menu" aria-expanded=${open ? "true" : "false"} @click=${() => (this._menu = open ? undefined : key)}>${t.snooze}</button>
      ${open
        ? html`<div class="menu" role="menu">
            ${choices.map(([label, until]) => html`<button type="button" role="menuitem" @click=${() => choose(until)}><span>${label}</span><span class="until">${i18n.day(until.getTime())}</span></button>`)}
          </div>`
        : nothing}
    </span>`;
  }

  /** The preset a blind did not arrive at (its target matches one), when it moved but stopped elsewhere. */
  private failedGoal(config: Settings, item: Failed): Preset | undefined {
    const target = item.cil as { pos?: unknown; tilt?: unknown } | undefined;
    if (!item.entita.startsWith("cover.") || !/^nedojela/i.test(item.duvod ?? "")) return undefined;
    return config.covers.presets.find((preset) => Math.abs(Number(target?.pos) - preset.position) <= config.covers.tolerance && Math.abs(Number(target?.tilt) - preset.tilt) <= config.covers.tolerance);
  }

  /** A failed command of a blind can be sent again when the sensor kept its target. */
  private retryOf(config: Settings, item: Failed): (() => void) | undefined {
    const target = item.cil as { pos?: unknown; tilt?: unknown } | undefined;
    if (!item.entita.startsWith("cover.") || !target || target.pos === undefined || target.tilt === undefined) return undefined;
    const pos = Number(target.pos);
    const tilt = Number(target.tilt);
    if (!Number.isFinite(pos) || !Number.isFinite(tilt)) return undefined;
    const preset = { name: "", position: pos, tilt } as Preset;
    return () =>
      this.send(
        `retry:${item.entita}`,
        { entities: [item.entita], done: () => this.coverDone(config, item.entita, preset) },
        "script",
        config.covers.script.split(".")[1],
        { entity: item.entita, pos, tilt },
      );
  }

  /* ---------- Teď běží ---------- */

  private duration(entityId: string, i18n: I18n): string {
    const start = this.starts.of(this.hass, entityId);
    if (start === undefined) return "";
    const minutes = Math.max(0, Math.floor((this._now - start) / 60000));
    return minutes < 60 ? i18n.t.minutes(minutes) : i18n.t.hours(Math.floor(minutes / 60), minutes % 60);
  }

  private renderRunning(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!config.running.length) return nothing;
    // Only what has no tile of its own (spec: „Teď běží ukazuje jen to, co nemá vlastní dlaždici“).
    const tiled = new Set(config.devices.flatMap((group) => group.entities.map((item) => item.entity)));
    const active = config.running.filter((item) => !tiled.has(item.entity) && ["on", "cleaning", "returning"].includes(readText(this.hass, item.entity) ?? ""));
    const parts = active.map((item) => `${this.name(item.name)} ${this.duration(item.entity, i18n)}`.trim());
    return html`<h2><span>${i18n.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${active.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${parts.length ? joined(parts) : i18n.t.nothingRuns}</span></div></div>`;
  }

  /* ---------- Žaluzie ---------- */

  /** Whether one blind is in the preset: undefined when it does not report its position. */
  private coverIn(config: Settings, id: string, preset: Preset): boolean | undefined {
    const entity = entityState(this.hass, id);
    if (!entity || isNoValue(entity.state)) return undefined;
    const position = Number(entity.attributes.current_position);
    const tilt = Number(entity.attributes.current_tilt_position);
    if (!Number.isFinite(position) || !Number.isFinite(tilt)) return undefined;
    return Math.abs(position - preset.position) <= config.covers.tolerance && Math.abs(tilt - preset.tilt) <= config.covers.tolerance;
  }

  /** How many blinds are in the preset, and how many report their position at all. */
  private inPreset(config: Settings, preset: Preset): { count: number; known: number } {
    let count = 0;
    let known = 0;
    for (const id of config.covers.entities) {
      const inside = this.coverIn(config, id, preset);
      if (inside === undefined) continue;
      known += 1;
      if (inside) count += 1;
    }
    return { count, known };
  }

  private renderCovers(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!config.covers.entities.length) return nothing;
    const last = config.covers.presets.length - 1;
    return html`<h2>
        <span>${i18n.t.covers}</span>
        <button class="chevron" type="button" data-open="covers" aria-haspopup="dialog" aria-label=${i18n.t.coversDetail} @click=${() => (this._detail = "covers")}>
          <span aria-hidden="true">›</span>
        </button>
      </h2>
      <div class="tiles" data-part="covers">
        ${config.covers.presets.map((preset, index) => {
          const { count, known } = this.inPreset(config, preset);
          // A blind without data is in no preset, so the preset is not the state of all of them.
          const all = known === config.covers.entities.length && count === known;
          const tileState: TileState = all ? "on" : count > 0 ? "mixed" : "idle";
          return html`<dd-tile
            kind="action"
            centered
            guarded
            .name=${this.name(preset.name)}
            .state=${tileState}
            .count=${count > 0 && !all ? count : undefined}
            .hint=${i18n.t.hint}
            .hintAlign=${index === 0 ? "start" : index === last ? "end" : "center"}
            .holdMs=${config.guard.holdMs}
            .doubleTapMs=${config.guard.doubleTapMs}
            .hintSeconds=${config.guard.hintSeconds}
            .pending=${this.pending.has(`covers:${index}`)}
            @hdk-press=${() => this.setCovers(config, preset, `covers:${index}`)}
          ></dd-tile>`;
        })}
      </div>`;
  }

  /** When something happened: the time today, else the day. */
  private when(ms: number, i18n: I18n): string {
    return new Date(ms).toDateString() === new Date(this._now).toDateString() ? i18n.time(ms) : i18n.day(ms);
  }

  /** The last action of one blind: a failed command first (warning), else who moved it and when. */
  private coverAction(config: Settings, id: string, i18n: I18n): { text: string; warn: boolean } | undefined {
    const t = i18n.t;
    const failed = this.failed(config).find((item) => item.entita === id);
    if (failed) {
      const time = failed.cas ? Date.parse(failed.cas) : NaN;
      const goal = this.failedGoal(config, failed);
      if (goal) return { text: [t.notArrivedTo(this.name(goal.name)), Number.isFinite(time) ? this.when(time, i18n) : ""].filter(Boolean).join("\u00a0"), warn: true };
      return { text: [Number.isFinite(time) ? t.notArrived(this.when(time, i18n)) : t.notArrived("").trim(), failed.duvod].filter(Boolean).join(" · "), warn: true };
    }
    const items = entityState(this.hass, config.covers.lastAction)?.attributes.polozky as Record<string, { kdo?: unknown; cas?: unknown }> | undefined;
    const last = items && typeof items === "object" ? items[id] : undefined;
    if (!last || typeof last.kdo !== "string") return undefined;
    const time = typeof last.cas === "string" ? Date.parse(last.cas) : NaN;
    // The time stays with its word on a narrow screen ("Večerní fáze 16:40").
    return { text: [t.who[last.kdo] ?? last.kdo, Number.isFinite(time) ? this.when(time, i18n) : ""].filter(Boolean).join("\u00a0"), warn: false };
  }

  /** Detail of the blinds: every room with its last action and the three presets just for it (one tap: the sheet was opened on purpose). */
  private renderCoversDetail(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!config.covers.entities.length) return nothing;
    const t = i18n.t;
    const open = this._detail === "covers";
    return html`<dd-sheet .open=${open} .heading=${t.covers} .closeLabel=${t.close} @hdk-close=${() => (this._detail = undefined)}>
      ${open
        ? html`<div class="detail" data-part="covers-detail">
            ${config.covers.entities.map((id) => {
              const entity = entityState(this.hass, id);
              const configured = config.covers.names[id];
              const friendly = entity?.attributes.friendly_name;
              const name = configured !== undefined ? this.name(configured) : typeof friendly === "string" ? friendly : id;
              const action = this.coverAction(config, id, i18n);
              return html`<div class="cover-row" data-cover=${id}>
                <span class="main">${name}${action ? html`<small class=${action.warn ? "warn" : ""}>${joinedText(action.text)}</small>` : nothing}</span>
                <span class="presets">
                  ${config.covers.presets.map(
                    (preset, index) => html`<dd-tile
                      kind="action"
                      centered
                      .name=${this.name(preset.name)}
                      .label=${`${name}: ${this.name(preset.name)}`}
                      .state=${(this.coverIn(config, id, preset) ? "on" : "idle") as TileState}
                      .pending=${this.pending.has(`cover:${id}:${index}`)}
                      @hdk-press=${() =>
                        this.send(`cover:${id}:${index}`, { entities: [id], done: () => this.coverDone(config, id, preset) }, "script", config.covers.script.split(".")[1], {
                          entity: id,
                          pos: preset.position,
                          tilt: preset.tilt,
                        })}
                    ></dd-tile>`,
                  )}
                </span>
              </div>`;
            })}
          </div>`
        : nothing}
    </dd-sheet>`;
  }

  private setCovers(config: Settings, preset: Preset, key: string): void {
    const script = config.covers.script.split(".")[1];
    if (this.pending.has(key)) return;
    this.pending.start(key, this.hass, { entities: config.covers.entities, done: () => config.covers.entities.every((id) => this.coverDone(config, id, preset)) });
    for (const entity of config.covers.entities) {
      this.call("script", script, { entity, pos: preset.position, tilt: preset.tilt }, key);
    }
  }

  /* ---------- Větrání ---------- */

  private align(index: number): "start" | "center" | "end" {
    return index % 3 === 0 ? "start" : index % 3 === 2 ? "end" : "center";
  }

  private renderVentilation(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    const t = i18n.t;
    const items: Named[] = [...(config.ventilation.mode ? [{ name: t.ventilationMode, entity: config.ventilation.mode }] : []), ...config.ventilation.fans];
    if (!items.length) return nothing;
    return html`<h2><span>${t.ventilation}</span></h2>
      <div class="tiles" data-part="ventilation">
        ${items.map((item, index) => {
          const entity = entityState(this.hass, item.entity);
          const missing = !entity || isNoValue(entity.state);
          const on = entity?.state === "on";
          return html`<dd-tile
            kind="toggle"
            guarded
            data-entity=${item.entity}
            .name=${this.name(item.name)}
            .text=${missing ? t.unavailable : on ? t.runs(this.duration(item.entity, i18n)).trim() : t.off}
            .state=${(on ? "on" : "off") as TileState}
            .disabled=${missing}
            .hint=${t.hint}
            .hintAlign=${this.align(index)}
            .holdMs=${config.guard.holdMs}
            .doubleTapMs=${config.guard.doubleTapMs}
            .hintSeconds=${config.guard.hintSeconds}
            .pending=${this.pending.has(`toggle:${item.entity}`)}
            @hdk-toggle=${(event: CustomEvent<{ checked: boolean }>) => {
              const want = event.detail.checked ? "on" : "off";
              this.send(`toggle:${item.entity}`, { entities: [item.entity], done: () => readText(this.hass, item.entity) === want }, "homeassistant", event.detail.checked ? "turn_on" : "turn_off", {
                entity_id: item.entity,
              });
            }}
          ></dd-tile>`;
        })}
      </div>`;
  }

  /* ---------- Další zařízení (Světla, Zásuvky, Vysavače …) ---------- */

  /**
   * One section per kind from the configuration („Q218 zatím A“). A light, a switch or a fan is a guarded toggle like
   * a fan of Větrání; a vacuum opens its details in Home Assistant (one tap changes nothing).
   */
  private renderDevices(config: Settings, i18n: I18n): TemplateResult[] {
    const t = i18n.t;
    return config.devices
      .filter((group) => group.entities.length)
      .map(
        (group, at) => html`<h2><span>${this.name(group.name)}</span></h2>
          <div class="tiles" data-part=${`devices-${at}`}>
            ${group.entities.map((item, index) => {
              const entity = entityState(this.hass, item.entity);
              const missing = !entity || isNoValue(entity.state);
              if (item.entity.startsWith("vacuum.")) {
                const cleaning = entity?.state === "cleaning";
                const hass = this.hass as (HomeAssistant & { formatEntityState?: (stateObj: unknown) => string }) | undefined;
                const words = entity && hass?.formatEntityState ? hass.formatEntityState(entity) : (entity?.state ?? "");
                const text = missing ? t.unavailable : cleaning ? [words, this.duration(item.entity, i18n)].filter(Boolean).join(" · ") : words;
                return html`<dd-tile
                  kind="open"
                  data-entity=${item.entity}
                  .name=${this.name(item.name)}
                  .text=${text}
                  .state=${(cleaning ? "on" : missing ? "off" : "idle") as TileState}
                  .disabled=${missing}
                  @hdk-open=${() => this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: item.entity } }))}
                ></dd-tile>`;
              }
              const on = entity?.state === "on";
              return html`<dd-tile
                kind="toggle"
                guarded
                data-entity=${item.entity}
                .name=${this.name(item.name)}
                .text=${missing ? t.unavailable : on ? t.on : t.off}
                .state=${(on ? "on" : "off") as TileState}
                .disabled=${missing}
                .hint=${t.hint}
                .hintAlign=${this.align(index)}
                .holdMs=${config.guard.holdMs}
                .doubleTapMs=${config.guard.doubleTapMs}
                .hintSeconds=${config.guard.hintSeconds}
                .pending=${this.pending.has(`toggle:${item.entity}`)}
                @hdk-toggle=${(event: CustomEvent<{ checked: boolean }>) => {
                  const want = event.detail.checked ? "on" : "off";
                  this.send(`toggle:${item.entity}`, { entities: [item.entity], done: () => readText(this.hass, item.entity) === want }, "homeassistant", event.detail.checked ? "turn_on" : "turn_off", {
                    entity_id: item.entity,
                  });
                }}
              ></dd-tile>`;
            })}
          </div>`,
      );
  }

  /* ---------- Topení a Klimatizace ---------- */

  private target(id: string, i18n: I18n, half: boolean): string {
    const value = Number(entityState(this.hass, id)?.attributes.temperature);
    return Number.isFinite(value) ? `${half ? i18n.half(value) : i18n.whole(value)}°` : "";
  }

  private renderHeating(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!config.heating.rooms.length) return nothing;
    const t = i18n.t;
    const manual = config.heating.rooms.filter((room) => readText(this.hass, room.entity) === "heat").length;
    return html`<h2>
        <span>${t.heating}</span>
        ${manual && config.heating.resume
          ? this.link("resume", html`<span class="count">${t.manualCount(manual)} · </span>${t.resume}`, () =>
              this.send(
                "resume",
                { entities: config.heating.rooms.map((room) => room.entity), done: () => !config.heating.rooms.some((room) => readText(this.hass, room.entity) === "heat") },
                "button",
                "press",
                { entity_id: config.heating.resume },
              ),
            )
          : nothing}
      </h2>
      <div class="tiles" data-part="heating">
        ${config.heating.rooms.map((room) => {
          const mode = readText(this.hass, room.entity);
          const text = mode === undefined ? t.unavailable : mode === "off" ? t.off : [mode === "auto" ? t.schedule : t.manual, this.target(room.entity, i18n, true)].filter(Boolean).join(" · ");
          const tileState: TileState = mode === undefined || mode === "off" ? "off" : mode === "auto" ? "idle" : "on";
          return this.openTile("heating", room, text, tileState, mode === undefined);
        })}
      </div>`;
  }

  private renderCooling(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!config.cooling.rooms.length) return nothing;
    const t = i18n.t;
    const running = config.cooling.rooms.filter((room) => !["off", undefined].includes(readText(this.hass, room.entity)));
    return html`<h2>
        <span>${t.cooling}</span>
        ${running.length
          ? this.link("alloff", t.allOff, () =>
              this.send(
                "alloff",
                { entities: running.map((room) => room.entity), done: () => running.every((room) => ["off", undefined].includes(readText(this.hass, room.entity))) },
                "climate",
                "turn_off",
                { entity_id: running.map((room) => room.entity) },
              ),
            )
          : nothing}
      </h2>
      <div class="tiles" data-part="cooling">
        ${config.cooling.rooms.map((room) => {
          const mode = readText(this.hass, room.entity);
          const preset = String(entityState(this.hass, room.entity)?.attributes.preset_mode ?? "");
          const key = mode === "cool" && preset === "wind_free" ? "wind_free" : mode === "heat_cool" ? "auto" : (mode ?? "");
          const text = mode === undefined ? t.unavailable : mode === "off" ? t.off : [t.mode[key] ?? t.on, mode === "fan_only" ? "" : this.target(room.entity, i18n, false)].filter(Boolean).join(" · ");
          return this.openTile("cooling", room, text, mode === undefined || mode === "off" ? "off" : "on", mode === undefined);
        })}
      </div>`;
  }

  /** A tile that opens the popup Topení / Klimatizace with its room selected: one tap, it changes nothing by itself. */
  private openTile(system: "heating" | "cooling", room: Named, text: string, tileState: TileState, missing: boolean): TemplateResult {
    return html`<dd-tile
      kind="open"
      data-entity=${room.entity}
      .name=${this.name(room.name)}
      .text=${text}
      .state=${tileState}
      .disabled=${missing}
      @hdk-open=${() => {
        this._climateSelected = [room.entity];
        this._detail = system;
      }}
    ></dd-tile>`;
  }

  /** The shared popup of the kit for one system (spec of the kit: in the card Dům only one system, no switch). */
  private renderClimate(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    const system = this._detail === "heating" || this._detail === "cooling" ? this._detail : undefined;
    const rooms = (system ?? "heating") === "heating" ? config.heating.rooms : config.cooling.rooms;
    if (!config.heating.rooms.length && !config.cooling.rooms.length) return nothing;
    const close = async () => {
      // What waits goes now (spec: „odešle se při zavření nebo po 2s od změny“).
      await (this.renderRoot.querySelector("dd-climate") as (Element & { flush(): Promise<void> }) | null)?.flush();
      this._detail = undefined;
    };
    return html`<dd-sheet .open=${system !== undefined} .heading=${system === "cooling" ? i18n.t.cooling : i18n.t.heating} .closeLabel=${i18n.t.close} @hdk-close=${close}>
      ${system
        ? html`<dd-climate
            .hass=${this.hass}
            .i18n=${i18n}
            .texts=${i18n.t.climate}
            .system=${system}
            .rooms=${rooms.map((room) => ({ name: this.name(room.name), entity: room.entity }))}
            .selected=${this._climateSelected}
            .delayMs=${config.sendDelaySeconds * 1000}
            @hdk-select-rooms=${(event: CustomEvent<{ selected: string[] }>) => (this._climateSelected = event.detail.selected)}
            @hdk-error=${(event: CustomEvent<{ message: string }>) => (this._error = event.detail.message)}
            @hdk-more-info=${async (event: CustomEvent<{ entityId: string }>) => {
              // „Detail a historie“: the popup sends what waits, closes and the detail of Home Assistant opens.
              await close();
              this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: event.detail.entityId }, bubbles: true, composed: true }));
            }}
          ></dd-climate>`
        : nothing}
    </dd-sheet>`;
  }

  /* ---------- Chráněný odkaz v nadpisu oddílu ---------- */

  private link(key: string, label: unknown, run: () => void): TemplateResult {
    const tap = (event: MouseEvent) => {
      // Keyboard and screen readers click without a pointer: deliberate, so at once.
      if (event.detail === 0) {
        this.gesture.cancel();
        run();
        return;
      }
      const kind = this.gesture.tap(key, event.timeStamp);
      if (kind === "double") {
        this._hint = undefined;
        run();
      } else if (kind === "single") {
        this._hint = key;
        window.clearTimeout(this.hintTimer);
        this.hintTimer = window.setTimeout(() => (this._hint = undefined), (this._config?.guard.hintSeconds ?? 3) * 1000);
      }
    };
    const down = (event: PointerEvent) => {
      if (event.button > 0) return;
      this.gesture.start(() => {
        this._hint = undefined;
        run();
      });
    };
    const release = () => this.gesture.release();
    return html`<button class="link ${this.pending.has(key) ? "pending" : ""}" type="button" data-link=${key} aria-busy=${this.pending.has(key) ? "true" : nothing} @click=${tap} @pointerdown=${down} @pointerup=${release} @pointerleave=${release} @pointercancel=${release} @contextmenu=${(event: Event) => event.preventDefault()}>
      ${label}${this._hint === key ? html`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : nothing}
    </button>`;
  }

  /* ---------- Volání Home Assistantu ---------- */

  private call(domain: string, service: string, data: Record<string, unknown>, key?: string): void {
    this._error = "";
    this.hass?.callService(domain, service, data).catch((error: unknown) => {
      if (key) this.pending.stop(key);
      this._error = `${this.i18n.t.failed}: ${error instanceof Error ? error.message : String(error)}`;
    });
  }

  /** Sends and pulses the control `key` until `command` is done (or nothing changes for a while, or the call fails). */
  private send(key: string, command: PendingCommand, domain: string, service: string, data: Record<string, unknown>): void {
    // A second press while it is on its way sends nothing again.
    if (this.pending.has(key)) return;
    this.pending.start(key, this.hass, command);
    this.call(domain, service, data, key);
  }

  /** A blind in a preset and still (its way is over). */
  private coverDone(config: Settings, id: string, preset: Preset): boolean {
    const state = entityState(this.hass, id)?.state;
    return state === undefined || isNoValue(state) || (this.coverIn(config, id, preset) === true && state !== "opening" && state !== "closing");
  }
}
