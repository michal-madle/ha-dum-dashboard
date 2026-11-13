import { cardLanguage, getI18n as kitGetI18n, pageLanguage } from "ha-dashboard-kit/i18n";
import type { Dictionaries, I18n as KitI18n } from "ha-dashboard-kit/i18n";
import { cs } from "./translations/cs";
import { en } from "./translations/en";
import { sv } from "./translations/sv";
import type { HomeAssistant, Language } from "./types";

/* Translations (CURRENT_SPEC.md, Jazyky): Czech is the source and its type is the contract of the other dictionaries. */
export type Texts = typeof cs;
export type I18n = KitI18n<Texts>;

const TEXTS: Dictionaries<Texts> = { cs, en, sv };

export { cardLanguage, pageLanguage };

export function getI18n(language: Language, hass?: HomeAssistant): I18n {
  return kitGetI18n(TEXTS, language, hass);
}
