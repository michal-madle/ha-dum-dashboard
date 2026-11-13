import type { LocalizedText } from "ha-dashboard-kit/config";
import type { HassEntity, HomeAssistant, Language, LanguageSetting } from "ha-dashboard-kit/types";

export type { HassEntity, HomeAssistant, Language, LanguageSetting };

export interface Named {
  name: LocalizedText;
  entity: string;
}

export interface Battery {
  name: LocalizedText;
  /** binary_sensor: on = the battery is low. */
  low: string;
  /** sensor with the level in %. */
  level?: string;
  /** sensor with the battery type (CR2032 …). */
  type?: string;
}

/** An air conditioner whose filter is counted (CURRENT_SPEC.md, úkoly ve frontě). */
export interface Filter {
  name: LocalizedText;
  /** input_number: hours of running since the filter was cleaned. */
  hours: string;
  /** select: the threshold of the air conditioner in hours ("180", "300" …). */
  threshold: string;
}

/** Maintenance of an appliance after a number of cycles (CURRENT_SPEC.md, úkoly ve frontě). */
export interface Maintenance {
  name: LocalizedText;
  /** What to do: „Vyčistit buben“. */
  task: LocalizedText;
  /** counter: cycles since the last maintenance (yaml/packages/udrzba.yaml in ha-config). */
  counter: string;
  /** After how many cycles. */
  every: number;
}

export interface Preset {
  name: LocalizedText;
  position: number;
  tilt: number;
}

/** The configuration after validation: every optional key has its default. */
export interface Settings {
  language: LanguageSetting;
  houseMode?: string;
  summer: string;
  failedActions?: string;
  clearFailed?: string;
  /** The sensor with the postponed items and the script that postpones one. */
  snoozed?: string;
  snoozeScript?: string;
  batteries: Battery[];
  filters: Filter[];
  /** input_boolean per machine: on = the laundry waits in it (yaml/packages/pradlo.yaml in ha-config). */
  laundry: Named[];
  maintenance: Maintenance[];
  running: Named[];
  covers: {
    script: string;
    entities: string[];
    /** Names of the blinds for the detail; without one the friendly name of the entity. */
    names: Record<string, LocalizedText>;
    /** sensor.zaluzie_posledni_akce: who moved each blind last, when and where to (attribute polozky). */
    lastAction?: string;
    presets: Preset[];
    tolerance: number;
  };
  ventilation: { mode?: string; fans: Named[] };
  heating: { resume?: string; rooms: Named[] };
  cooling: { rooms: Named[] };
  guard: { holdMs: number; doubleTapMs: number; hintSeconds: number };
  /** The popup Topení / Klimatizace sends a change this long after the last one (or when it closes). */
  sendDelaySeconds: number;
}

declare global {
  const __BUILD__: string;
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}
