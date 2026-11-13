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
  running: Named[];
  covers: { script: string; entities: string[]; presets: Preset[]; tolerance: number };
  ventilation: { mode?: string; fans: Named[] };
  heating: { resume?: string; rooms: Named[] };
  cooling: { rooms: Named[] };
  guard: { holdMs: number; doubleTapMs: number; hintSeconds: number };
}

declare global {
  const __BUILD__: string;
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}
