/**
 * „Co se stalo“ (CURRENT_SPEC.md karty Dům): today's logbook of Home Assistant for the entities of the card, made
 * readable. The way of a blind (opening, closing) is not a row, but its reason (the automation or the app that sent
 * it) goes to the end position, which Home Assistant reports without one. One action on many entities at once (all
 * blinds by an evening phase) is one row with the list of the entities (uživatel 13. 11. 2026: „navrh- groupovat
 * hromadné akce. Proste vyjet žaluzie a seznam klidne menším písmem.“).
 */

/** One entry of the logbook of Home Assistant (`logbook/get_events`). */
export interface LogEntry {
  entity_id: string;
  state?: unknown;
  name?: string;
  /** Seconds since the epoch, or an ISO time. */
  when: number | string;
  context_user_id?: string;
  context_name?: string;
  context_entity_id_name?: string;
}

/** One change of one entity, with its reason. */
export interface LogItem {
  entry: LogEntry;
  time: number;
  state: string;
  /** The automation or script, `app` for a person in the app, or "" when Home Assistant does not say. */
  reason: string;
  kind: string;
}

/** Entities of one kind that went to one state together („Větrání · Zapnuto: Koupelna patro, Záchod patro“). */
export interface LogGroup {
  kind: string;
  state: string;
  items: LogItem[];
}

/**
 * A row of the journal: one moment. Its cause (`head`: what a person did in the app, else the first change) and what
 * followed from it within the moment, grouped by kind and state (uživatel 13. 11. 2026 k zapnutí Větracího režimu:
 * „To groupovani moc nefunguje. Tohle všechno byl zapnuti větrání a větracího režimu.“).
 */
export interface LogRow {
  time: number;
  head: LogItem;
  groups: LogGroup[];
}

/** States that are not a row: unavailable is the queue's business, opening and closing the way of a blind. */
const SKIPPED = ["unavailable", "unknown", ""];
const WAY = ["opening", "closing"];
/** Changes this close to the previous one belong to one moment (a phase or a mode switches one thing after another). */
const MOMENT_MS = 60000;

export function logTime(entry: LogEntry): number {
  return typeof entry.when === "number" ? entry.when * 1000 : Date.parse(entry.when);
}

function reasonOf(entry: LogEntry): string {
  return entry.context_name || entry.context_entity_id_name || (entry.context_user_id ? "app" : "");
}

/** The rows of the journal, newest first. `kindOf` says which entities belong together (blinds, heating …). */
export function logRows(entries: LogEntry[], kindOf: (entity: string) => string): LogRow[] {
  const sorted = entries.filter((entry) => typeof entry.entity_id === "string" && entry.state !== undefined).sort((a, b) => logTime(a) - logTime(b));
  const way = new Map<string, string>();
  const items: LogItem[] = [];
  for (const entry of sorted) {
    const state = String(entry.state);
    if (WAY.includes(state)) {
      const reason = reasonOf(entry);
      if (reason) way.set(entry.entity_id, reason);
      continue;
    }
    const reason = reasonOf(entry) || way.get(entry.entity_id) || "";
    way.delete(entry.entity_id);
    if (SKIPPED.includes(state)) continue;
    items.push({ entry, time: logTime(entry), state, reason, kind: kindOf(entry.entity_id) });
  }
  // Moments: a change within a minute of the previous one belongs to it.
  // What a person did in the app is always a cause of its own row, never merged under another one.
  const moments: LogItem[][] = [];
  for (const item of items) {
    const last = moments.at(-1);
    const person = item.reason === "app" && last?.some((other) => other.reason === "app");
    if (last && !person && item.time - last[last.length - 1].time <= MOMENT_MS) last.push(item);
    else moments.push([item]);
  }
  return moments
    .map((moment) => {
      // In one moment an entity counts once, with where it ended (a blind closes and then opens its slats).
      const latest = new Map<string, LogItem>();
      for (const item of moment) {
        latest.delete(item.entry.entity_id);
        latest.set(item.entry.entity_id, item);
      }
      const list = [...latest.values()].sort((a, b) => a.time - b.time);
      // The cause: what a person did in the app, else the earliest change.
      const head = list.find((item) => item.reason === "app") ?? list[0];
      const groups: LogGroup[] = [];
      for (const item of list) {
        if (item === head) continue;
        const key = item.kind || item.entry.entity_id;
        const group = groups.find((other) => (other.kind || other.items[0].entry.entity_id) === key && other.state === item.state);
        if (group) group.items.push(item);
        else groups.push({ kind: item.kind, state: item.state, items: [item] });
      }
      // The time of the cause.
      return { time: head.time, head, groups };
    })
    .sort((a, b) => b.time - a.time);
}

/** The names of a group without the words they all start with („Žaluzie pracovna“, „Žaluzie ložnice“ → „Pracovna, Ložnice“). */
export function shortNames(names: string[]): string[] {
  const words = names.map((name) => name.split(" "));
  let common = 0;
  while (words.every((item) => item.length > common + 1 && item[common] === words[0][common])) common += 1;
  return words.map((item) => {
    const rest = item.slice(common).join(" ");
    return rest.charAt(0).toLocaleUpperCase() + rest.slice(1);
  });
}
