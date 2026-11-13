import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { PropertyValues, TemplateResult } from "lit";
import { pickText } from "ha-dashboard-kit/config";
import type { LocalizedText } from "ha-dashboard-kit/config";
import { hintStyles } from "ha-dashboard-kit/controls";
import type { TileState } from "ha-dashboard-kit/controls";
import { entityState, isNoValue, readNumber, readText } from "ha-dashboard-kit/entities";
import { HoldOrDoubleTap } from "ha-dashboard-kit/gesture";
import { normalizeConfig } from "./config";
import { cardLanguage, getI18n } from "./i18n";
import type { I18n } from "./i18n";
import { styles } from "./styles";
import type { HomeAssistant, Named, Preset, Settings } from "./types";

/** One failed action of the automations (`polozky` of sensor.dum_nesplnene_akce). */
interface Failed {
  entita: string;
  akce?: string;
  duvod?: string;
  cas?: string;
  cil?: unknown;
}

const ICON_BATTERY = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`;

/**
 * Dům: the control centre of the house (CURRENT_SPEC.md of the card). The first screen: what needs the user, what
 * runs now, and the controls by group. Everything that switches something on this screen is protected against a tap
 * by mistake (hold or double tap); a tile with a chevron only opens the detail of its device.
 */
export class HaDumDashboard extends LitElement {
  static styles = [hintStyles, styles];

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: Settings;
  @state() private _error = "";
  @state() private _hint?: string;
  @state() private _now = Date.now();

  private timer?: number;
  private hintTimer?: number;
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
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    window.clearTimeout(this.hintTimer);
    this.gesture.dispose();
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass")) {
      this.toggleAttribute("data-light", this.hass?.themes?.darkMode === false);
      this._now = Date.now();
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
      ${this.renderVentilation(config, i18n)} ${climate}
      ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : nothing}
    </ha-card>`;
  }

  /* ---------- Potřebuje tebe ---------- */

  private failed(config: Settings): Failed[] {
    const items = entityState(this.hass, config.failedActions)?.attributes.polozky;
    return Array.isArray(items) ? items.filter((item): item is Failed => typeof item === "object" && item !== null && typeof (item as Failed).entita === "string") : [];
  }

  private renderQueue(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!config.failedActions && !config.batteries.length) return nothing;
    const t = i18n.t;
    const failed = this.failed(config);
    const low = config.batteries.filter((battery) => readText(this.hass, battery.low) === "on");
    const count = failed.length + low.length;
    const rows = [
      ...failed.map((item, index) => {
        const friendly = entityState(this.hass, item.entita)?.attributes.friendly_name;
        const time = item.cas ? Date.parse(item.cas) : NaN;
        // The reason and the time; without a reason the action that failed.
        const detail = [item.duvod || item.akce, Number.isFinite(time) ? i18n.time(time) : undefined].filter(Boolean).join(" · ");
        const retry = this.retryOf(config, item);
        return html`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${typeof friendly === "string" ? friendly : item.entita}<small>${detail}</small></span>
          ${retry
            ? html`<button class="button ${index === 0 ? "primary" : ""}" type="button" @click=${retry}>${t.retry}</button>`
            : config.clearFailed
              ? html`<button class="button" type="button" @click=${() => this.call("script", config.clearFailed!.split(".")[1], { entita: item.entita })}>${t.done}</button>`
              : nothing}
        </div>`;
      }),
      ...low.map((battery) => {
        const level = readNumber(this.hass, battery.level);
        const type = readText(this.hass, battery.type);
        const detail = [t.battery(level === undefined ? undefined : i18n.percent(Math.round(level))), type].filter(Boolean).join(" · ");
        return html`<div class="row" data-row="battery">
          <span class="mark">${ICON_BATTERY}</span>
          <span class="main">${this.name(battery.name)}<small>${detail}</small></span>
        </div>`;
      }),
    ];
    return html`<h2><span>${count ? `${t.needsYou} · ${count}` : t.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${rows.length ? rows : html`<div class="row"><span class="main">${t.nothingWaits}</span></div>`}
      </div>`;
  }

  /** A failed command of a blind can be sent again when the sensor kept its target. */
  private retryOf(config: Settings, item: Failed): (() => void) | undefined {
    const target = item.cil as { pos?: unknown; tilt?: unknown } | undefined;
    if (!item.entita.startsWith("cover.") || !target || target.pos === undefined || target.tilt === undefined) return undefined;
    const pos = Number(target.pos);
    const tilt = Number(target.tilt);
    if (!Number.isFinite(pos) || !Number.isFinite(tilt)) return undefined;
    return () => this.call("script", config.covers.script.split(".")[1], { entity: item.entita, pos, tilt });
  }

  /* ---------- Teď běží ---------- */

  private duration(since: string | undefined, i18n: I18n): string {
    const start = since ? Date.parse(since) : NaN;
    if (!Number.isFinite(start)) return "";
    const minutes = Math.max(0, Math.floor((this._now - start) / 60000));
    return minutes < 60 ? i18n.t.minutes(minutes) : i18n.t.hours(Math.floor(minutes / 60), minutes % 60);
  }

  private renderRunning(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!config.running.length) return nothing;
    const active = config.running.filter((item) => ["on", "cleaning", "returning"].includes(readText(this.hass, item.entity) ?? ""));
    const text = active.map((item) => `${this.name(item.name)} ${this.duration(entityState(this.hass, item.entity)?.last_changed, i18n)}`.trim()).join(" · ");
    return html`<h2><span>${i18n.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${active.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${text || i18n.t.nothingRuns}</span></div></div>`;
  }

  /* ---------- Žaluzie ---------- */

  /** How many blinds are in the preset, and how many report their position at all. */
  private inPreset(config: Settings, preset: Preset): { count: number; known: number } {
    let count = 0;
    let known = 0;
    for (const id of config.covers.entities) {
      const entity = entityState(this.hass, id);
      if (!entity || isNoValue(entity.state)) continue;
      const position = Number(entity.attributes.current_position);
      const tilt = Number(entity.attributes.current_tilt_position);
      if (!Number.isFinite(position) || !Number.isFinite(tilt)) continue;
      known += 1;
      if (Math.abs(position - preset.position) <= config.covers.tolerance && Math.abs(tilt - preset.tilt) <= config.covers.tolerance) count += 1;
    }
    return { count, known };
  }

  private renderCovers(config: Settings, i18n: I18n): TemplateResult | typeof nothing {
    if (!config.covers.entities.length) return nothing;
    const last = config.covers.presets.length - 1;
    return html`<h2><span>${i18n.t.covers}</span></h2>
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
            @hdk-press=${() => this.setCovers(config, preset)}
          ></dd-tile>`;
        })}
      </div>`;
  }

  private setCovers(config: Settings, preset: Preset): void {
    const script = config.covers.script.split(".")[1];
    for (const entity of config.covers.entities) {
      this.call("script", script, { entity, pos: preset.position, tilt: preset.tilt });
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
            .text=${missing ? t.unavailable : on ? t.runs(this.duration(entity?.last_changed, i18n)).trim() : t.off}
            .state=${(on ? "on" : "off") as TileState}
            .disabled=${missing}
            .hint=${t.hint}
            .hintAlign=${this.align(index)}
            .holdMs=${config.guard.holdMs}
            .doubleTapMs=${config.guard.doubleTapMs}
            .hintSeconds=${config.guard.hintSeconds}
            @hdk-toggle=${(event: CustomEvent<{ checked: boolean }>) =>
              this.call("homeassistant", event.detail.checked ? "turn_on" : "turn_off", { entity_id: item.entity })}
          ></dd-tile>`;
        })}
      </div>`;
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
              this.call("button", "press", { entity_id: config.heating.resume }),
            )
          : nothing}
      </h2>
      <div class="tiles" data-part="heating">
        ${config.heating.rooms.map((room) => {
          const mode = readText(this.hass, room.entity);
          const text = mode === undefined ? t.unavailable : mode === "off" ? t.off : [mode === "auto" ? t.schedule : t.manual, this.target(room.entity, i18n, true)].filter(Boolean).join(" · ");
          const tileState: TileState = mode === undefined || mode === "off" ? "off" : mode === "auto" ? "idle" : "on";
          return this.openTile(room, text, tileState, mode === undefined);
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
          ? this.link("alloff", t.allOff, () => this.call("climate", "turn_off", { entity_id: running.map((room) => room.entity) }))
          : nothing}
      </h2>
      <div class="tiles" data-part="cooling">
        ${config.cooling.rooms.map((room) => {
          const mode = readText(this.hass, room.entity);
          const preset = String(entityState(this.hass, room.entity)?.attributes.preset_mode ?? "");
          const key = mode === "cool" && preset === "wind_free" ? "wind_free" : mode === "heat_cool" ? "auto" : (mode ?? "");
          const text = mode === undefined ? t.unavailable : mode === "off" ? t.off : [t.mode[key] ?? t.on, mode === "fan_only" ? "" : this.target(room.entity, i18n, false)].filter(Boolean).join(" · ");
          return this.openTile(room, text, mode === undefined || mode === "off" ? "off" : "on", mode === undefined);
        })}
      </div>`;
  }

  /** A tile that opens the detail of its device: one tap, it changes nothing by itself. */
  private openTile(room: Named, text: string, tileState: TileState, missing: boolean): TemplateResult {
    return html`<dd-tile
      kind="open"
      data-entity=${room.entity}
      .name=${this.name(room.name)}
      .text=${text}
      .state=${tileState}
      .disabled=${missing}
      @hdk-open=${() => this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: room.entity }, bubbles: true, composed: true }))}
    ></dd-tile>`;
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
    return html`<button class="link" type="button" data-link=${key} @click=${tap} @pointerdown=${down} @pointerup=${release} @pointerleave=${release} @pointercancel=${release} @contextmenu=${(event: Event) => event.preventDefault()}>
      ${label}${this._hint === key ? html`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : nothing}
    </button>`;
  }

  /* ---------- Volání Home Assistantu ---------- */

  private call(domain: string, service: string, data: Record<string, unknown>): void {
    this._error = "";
    this.hass?.callService(domain, service, data).catch((error: unknown) => {
      this._error = `${this.i18n.t.failed}: ${error instanceof Error ? error.message : String(error)}`;
    });
  }
}
