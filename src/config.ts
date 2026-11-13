import { checkKeys, entityId, fail, isRecord, languageSetting, localizedText, section, text, withCardName } from "ha-dashboard-kit/config";
import type { LocalizedText } from "ha-dashboard-kit/config";
import type { Battery, Filter, Named, Preset, Settings } from "./types";

/*
 * The YAML of the card (CURRENT_SPEC.md, Konfigurace). The rules are the kit's: every key is optional, a key without a
 * value means the default, a wrong value stops the card with an error that names the key, an unknown key inside a
 * section is an error. Entities have no default: a part of the card without its entities is not shown.
 */

const DEFAULT_PRESETS: Preset[] = [
  { name: { cs: "Den", en: "Day", sv: "Dag" }, position: 100, tilt: 100 },
  { name: { cs: "Stín", en: "Shade", sv: "Skugga" }, position: 0, tilt: 100 },
  { name: { cs: "Tma", en: "Dark", sv: "Mörker" }, position: 0, tilt: 0 },
];

function list(value: unknown, where: string): unknown[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) fail(`"${where}" must be a list.`);
  return value;
}

function number(value: unknown, where: string, fallback: number, min: number, max: number): number {
  if (value === undefined || value === null) return fallback;
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) {
    fail(`${where} must be a number from ${min} to ${max}.`);
  }
  return value;
}

function named(value: unknown, where: string, domains: string[]): Named[] {
  return list(value, where).map((item, index) => {
    const at = `${where}[${index}]`;
    if (!isRecord(item)) fail(`${at} must be a mapping with name and entity.`);
    checkKeys(item, ["name", "entity"], at);
    const name = localizedText(item.name, `${at}.name`) ?? fail(`${at}.name is missing.`);
    const entity = entityId(item.entity, `${at}.entity`, { example: `${domains[0]}.example` }) ?? fail(`${at}.entity is missing.`);
    if (!domains.includes(entity.split(".")[0])) fail(`${at}.entity must be one of ${domains.join(", ")}, not ${entity}.`);
    return { name, entity };
  });
}

function normalize(raw: unknown): Settings {
  if (!isRecord(raw)) fail("the configuration must be a mapping of keys.");
  const covers = section(raw.covers, "covers");
  checkKeys(covers, ["script", "entities", "last_action", "presets", "tolerance"], "covers");
  // A blind is its entity, or a mapping with its name for the detail.
  const names: Record<string, LocalizedText> = {};
  const coverIds = list(covers.entities, "covers.entities").map((item, index) => {
    const at = `covers.entities[${index}]`;
    if (!isRecord(item)) return entityId(item, at, { domain: "cover" }) ?? fail(`${at} is missing.`);
    checkKeys(item, ["name", "entity"], at);
    const id = entityId(item.entity, `${at}.entity`, { domain: "cover" }) ?? fail(`${at}.entity is missing.`);
    const name = localizedText(item.name, `${at}.name`);
    if (name !== undefined) names[id] = name;
    return id;
  });
  const ventilation = section(raw.ventilation, "ventilation");
  checkKeys(ventilation, ["mode", "fans"], "ventilation");
  const heating = section(raw.heating, "heating");
  checkKeys(heating, ["resume", "rooms"], "heating");
  const cooling = section(raw.cooling, "cooling");
  checkKeys(cooling, ["rooms"], "cooling");
  const guard = section(raw.guard, "guard");
  checkKeys(guard, ["hold_ms", "double_tap_ms", "hint_seconds"], "guard");
  const modes = section(raw.house_modes, "house_modes");
  checkKeys(modes, ["winter", "summer"], "house_modes");

  const presets = list(covers.presets, "covers.presets").map((item, index): Preset => {
    const at = `covers.presets[${index}]`;
    if (!isRecord(item)) fail(`${at} must be a mapping with name, position and tilt.`);
    checkKeys(item, ["name", "position", "tilt"], at);
    return {
      name: localizedText(item.name, `${at}.name`) ?? fail(`${at}.name is missing.`),
      position: number(item.position, `${at}.position`, 0, 0, 100),
      tilt: number(item.tilt, `${at}.tilt`, 0, 0, 100),
    };
  });
  const batteries = list(raw.batteries, "batteries").map((item, index): Battery => {
    const at = `batteries[${index}]`;
    if (!isRecord(item)) fail(`${at} must be a mapping with name and low.`);
    checkKeys(item, ["name", "low", "level", "type"], at);
    return {
      name: localizedText(item.name, `${at}.name`) ?? fail(`${at}.name is missing.`),
      low: entityId(item.low, `${at}.low`, { domain: "binary_sensor" }) ?? fail(`${at}.low is missing.`),
      level: entityId(item.level, `${at}.level`, { domain: "sensor" }),
      type: entityId(item.type, `${at}.type`, { domain: "sensor" }),
    };
  });
  const filters = list(raw.filters, "filters").map((item, index): Filter => {
    const at = `filters[${index}]`;
    if (!isRecord(item)) fail(`${at} must be a mapping with name, hours and threshold.`);
    checkKeys(item, ["name", "hours", "threshold"], at);
    return {
      name: localizedText(item.name, `${at}.name`) ?? fail(`${at}.name is missing.`),
      hours: entityId(item.hours, `${at}.hours`, { domain: "input_number" }) ?? fail(`${at}.hours is missing.`),
      threshold: entityId(item.threshold, `${at}.threshold`, { domain: "select" }) ?? fail(`${at}.threshold is missing.`),
    };
  });

  return {
    language: languageSetting(raw.language),
    houseMode: entityId(raw.house_mode_entity, "house_mode_entity", { domain: "input_select" }),
    summer: text(modes.summer, "house_modes.summer") ?? "Léto",
    failedActions: entityId(raw.failed_actions, "failed_actions", { domain: "sensor" }),
    clearFailed: entityId(raw.clear_failed_script, "clear_failed_script", { domain: "script" }),
    snoozed: entityId(raw.snoozed, "snoozed", { domain: "sensor" }),
    snoozeScript: entityId(raw.snooze_script, "snooze_script", { domain: "script" }),
    batteries,
    filters,
    laundry: named(raw.laundry, "laundry", ["input_boolean"]),
    running: named(raw.running, "running", ["input_boolean", "binary_sensor", "switch", "vacuum"]),
    covers: {
      script: entityId(covers.script, "covers.script", { domain: "script" }) ?? "script.zaluzie_posun",
      entities: coverIds,
      names,
      lastAction: entityId(covers.last_action, "covers.last_action", { domain: "sensor" }),
      presets: presets.length ? presets : DEFAULT_PRESETS,
      tolerance: number(covers.tolerance, "covers.tolerance", 5, 0, 20),
    },
    ventilation: {
      mode: entityId(ventilation.mode, "ventilation.mode", { domain: "input_boolean" }),
      fans: named(ventilation.fans, "ventilation.fans", ["switch", "fan"]),
    },
    heating: {
      resume: entityId(heating.resume, "heating.resume", { domain: "button" }),
      rooms: named(heating.rooms, "heating.rooms", ["climate"]),
    },
    cooling: { rooms: named(cooling.rooms, "cooling.rooms", ["climate"]) },
    guard: {
      holdMs: number(guard.hold_ms, "guard.hold_ms", 550, 200, 3000),
      doubleTapMs: number(guard.double_tap_ms, "guard.double_tap_ms", 400, 150, 1500),
      hintSeconds: number(guard.hint_seconds, "guard.hint_seconds", 3, 1, 10),
    },
  };
}

export function normalizeConfig(raw: unknown): Settings {
  return withCardName("Dům Dashboard", () => normalize(raw));
}
