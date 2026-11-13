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

/** A row of the journal: one entry, or one action on several entities of one kind. */
export interface LogRow {
  time: number;
  entries: LogEntry[];
  state: string;
  /** The automation or script, `app` for a person in the app, or "" when Home Assistant does not say. */
  reason: string;
  kind: string;
}

/** States that are not a row: unavailable is the queue's business, opening and closing the way of a blind. */
const SKIPPED = ["unavailable", "unknown", ""];
const WAY = ["opening", "closing"];
/** Entries of one action are this close (a phase moves the blinds one after another). */
const GROUP_MS = 2 * 60000;

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
  const single: LogRow[] = [];
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
    single.push({ time: logTime(entry), entries: [entry], state, reason, kind: kindOf(entry.entity_id) });
  }
  const rows: LogRow[] = [];
  for (const row of single) {
    const group = rows.find(
      (item) =>
        item.kind === row.kind &&
        item.state === row.state &&
        item.reason === row.reason &&
        row.time - item.time <= GROUP_MS &&
        !item.entries.some((entry) => entry.entity_id === row.entries[0].entity_id),
    );
    if (group && row.kind) {
      group.entries.push(row.entries[0]);
      group.time = row.time;
    } else rows.push(row);
  }
  return rows.sort((a, b) => b.time - a.time);
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
