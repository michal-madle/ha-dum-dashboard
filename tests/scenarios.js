// Test scenarios of the Dům Dashboard card: the configuration of examples/dum.yaml and a fake `hass` object.
// Open /tests/harness.html?s=<scenario> (&theme=light for Home Assistant's light mode, &lang=en|sv).
import "/ha-dum-dashboard.js";
import { parse } from "/node_modules/yaml/browser/index.js";

const params = new URLSearchParams(location.search);
const scenario = params.get("s") ?? "evening";
const light = params.get("theme") === "light";
const lang = params.get("lang") ?? "cs";
const config = parse(await (await fetch("/examples/dum.yaml")).text());
const ago = (minutes) => new Date(Date.now() - minutes * 60000).toISOString();
const secondsAgo = (minutes) => (Date.now() - minutes * 60000) / 1000;
/** The rows of the recorder (`history/history_during_period`, minimal response) by entity. */
const history = {};
const entity = (state, attributes = {}, minutes = 600) => ({ state, attributes, last_changed: ago(minutes), last_updated: ago(minutes) });
// The attributes the climate entities have in Home Assistant (ha-config/ha/entities.json): Tado CE and Samsung SmartThings.
const TADO = { min_temp: 5, max_temp: 25, target_temp_step: 0.5, hvac_modes: ["heat", "off", "auto"], preset_modes: ["home", "away"], current_temperature: 21.6 };
const AC = { min_temp: 16, max_temp: 30, hvac_modes: ["off", "cool", "dry", "fan_only", "auto", "heat"], preset_modes: ["none", "sleep", "quiet", "smart", "boost", "wind_free", "wind_free_sleep"], fan_modes: ["auto", "low", "medium", "high", "turbo"], swing_modes: ["off", "both", "vertical", "horizontal"], fan_mode: "auto", swing_mode: "off", current_temperature: 23.4 };
const tado = (state, attributes) => entity(state, { ...TADO, ...attributes });
const ac = (state, attributes) => entity(state, { ...AC, preset_mode: "none", ...attributes });

const states = { "input_select.house_mode": entity("Zima") };
for (const battery of config.batteries) {
  states[battery.low] = entity("off");
  states[battery.level] = entity("78");
  states[battery.type] = entity("CR2032");
}
for (const filter of config.filters) {
  states[filter.hours] = entity("120.4");
  states[filter.threshold] = entity("300");
}
for (const item of config.laundry) states[item.entity] = entity("off");
for (const item of config.maintenance) states[item.counter] = entity("3");
for (const item of config.running) states[item.entity] = entity("off");
const coverIds = config.covers.entities.map((item) => (typeof item === "string" ? item : item.entity));
for (const id of coverIds) states[id] = entity("closed", { current_position: 0, current_tilt_position: 0, friendly_name: id });
states[config.covers.last_action] = entity(ago(100), { polozky: Object.fromEntries(coverIds.map((id) => [id, { kdo: "evening", cas: ago(100), pos: 0, tilt: 0 }])) });
states[config.ventilation.mode] = entity("off");
for (const fan of config.ventilation.fans) states[fan.entity] = entity("off");
const targets = [21, 19, 20, 20, 22.5, 8];
config.heating.rooms.forEach((room, index) => (states[room.entity] = tado("auto", { temperature: targets[index] })));
for (const room of config.cooling.rooms) states[room.entity] = ac("off", { temperature: 22 });
for (const group of config.devices ?? []) for (const item of group.entities) states[item.entity] = entity(item.entity.startsWith("vacuum.") ? "docked" : "off");
states["switch.kuchyne_osvetleni_kuchyne"] = entity("on");
states["vacuum.technicka_mistnost_roborock_prizemi_robot_cleaner"] = entity("cleaning", {}, 12);
states[config.failed_actions] = entity("0", { polozky: [] });
states[config.snoozed] = entity("0", { polozky: [] });

if (scenario === "evening") {
  // 18:42 in winter: one blind did not arrive, one battery is low, the washing machine and the dishwasher run.
  states["cover.maxik_zaluzie_maxik"] = entity("unavailable", { friendly_name: "Žaluzie Maxík" });
  states[config.failed_actions] = entity("1", { polozky: [{ entita: "cover.maxik_zaluzie_maxik", akce: "poloha 0 %, lamely 0 %", duvod: "žaluzie nedostupná", cas: ago(122), cil: { pos: "0", tilt: "0" } }] });
  states["binary_sensor.loznice_okno_loznice_battery"] = entity("on");
  states["sensor.loznice_okno_loznice_battery"] = entity("8");
  states["input_boolean.technicka_mistnost_pracka_bezi"] = entity("on", {}, 42);
  states["input_boolean.kuchyne_mycka_bezi"] = entity("on", {}, 65);
  states["switch.koupelna_vetrak_zachod_patro"] = entity("on", {}, 8);
  states["climate.pracovna_tado_ce_pracovna"] = tado("heat", { temperature: 22.5 });
  states["climate.garaz_tado_ce_garaz"] = tado("off", { temperature: 8 });
  states["climate.obyvak_ac_obyvak"] = ac("heat", { temperature: 23, preset_mode: "none" });
}
if (scenario === "summer") {
  states["input_select.house_mode"] = entity("Léto");
  states["cover.loznice_zaluzie_loznice"] = entity("open", { current_position: 100, current_tilt_position: 100 });
  states["climate.obyvak_ac_obyvak"] = ac("cool", { temperature: 22, preset_mode: "none" });
  states["climate.loznice_ac_loznice"] = ac("cool", { temperature: 24, preset_mode: "wind_free" });
  states["climate.maxik_ac_maxik"] = entity("unavailable");
}
if (scenario === "day") {
  for (const id of coverIds) states[id] = entity("open", { current_position: 100, current_tilt_position: 97 });
}

if (scenario === "restart") {
  // Home Assistant restarted 2 minutes ago: the helpers came back "on" with the time of the restart (last_changed),
  // but the recorder knows that the washing machine began 30 minutes and the vent 25 minutes ago. The dishwasher has no history.
  states["input_boolean.technicka_mistnost_pracka_bezi"] = entity("on", {}, 2);
  states["input_boolean.kuchyne_mycka_bezi"] = entity("on", {}, 2);
  states["switch.koupelna_vetrak_zachod_patro"] = entity("on", {}, 2);
  history["input_boolean.technicka_mistnost_pracka_bezi"] = [{ s: "off", lu: secondsAgo(180) }, { s: "on", lu: secondsAgo(30) }, { s: "on", lu: secondsAgo(2) }];
  history["switch.koupelna_vetrak_zachod_patro"] = [{ s: "on", lu: secondsAgo(2) }, { s: "unavailable", lu: secondsAgo(2.5) }, { s: "on", lu: secondsAgo(25) }].sort((a, b) => a.lu - b.lu);
}

if (light) {
  document.documentElement.style.background = "#f2f2f7";
  document.body.style.background = "#f2f2f7";
  document.body.style.color = "#000";
}

// The logbook of today (Co se stalo): a phase moved the blinds 10 min ago, the app switched the AC 2 h ago.
const nowSec = Date.now() / 1000;
const logbook = [
  // Bulk: the phase closes two blinds; the end position comes without a reason (the device reports it).
  { entity_id: "cover.loznice_zaluzie_loznice", state: "closed", name: "Žaluzie Ložnice", when: nowSec - 600 },
  { entity_id: "cover.pracovna_zaluzie_pracovna", state: "closing", name: "Žaluzie Pracovna", when: nowSec - 630, context_name: "Večerní fáze" },
  { entity_id: "cover.pracovna_zaluzie_pracovna", state: "closed", name: "Žaluzie Pracovna", when: nowSec - 590 },
  { entity_id: "climate.obyvak_ac_obyvak", state: "heat", name: "Klimatizace Obývák", when: nowSec - 7200, context_user_id: "u1" },
  { entity_id: "cover.loznice_zaluzie_loznice", state: "closing", name: "Žaluzie Ložnice", when: nowSec - 640, context_name: "Večerní fáze" },
  // No reason in the logbook: the last action of the blind says the evening phase (100 min ago).
  { entity_id: "cover.maxik_zaluzie_maxik", state: "closed", name: "Žaluzie Maxík", when: nowSec - 5970 },
  { entity_id: "input_boolean.technicka_mistnost_susicka_bezi", state: "off", name: "Sušička běží", when: nowSec - 3000, context_name: "Sušička - konec cyklu" },
  { entity_id: "climate.obyvak_ac_obyvak", state: "unavailable", name: "Klimatizace Obývák", when: nowSec - 7300 },
];
// The recorder: both blinds of the evening phase stopped in Tma (position and tilt 0).
for (const id of ["cover.loznice_zaluzie_loznice", "cover.pracovna_zaluzie_pracovna"]) history[id] ??= [{ s: "closed", a: { current_position: 0, current_tilt_position: 0 }, lu: nowSec - 600 }];
const test = (window.__test = { config, calls: [], fail: false, history, lookups: 0, logbook, logQueries: [] });
const card = document.createElement("ha-dum-dashboard");
card.setConfig(config);
let current = {
  states,
  themes: { darkMode: !light },
  language: lang,
  locale: { language: lang },
  callService: async (domain, service, data) => {
    test.calls.push({ domain, service, data });
    if (test.fail) throw new Error("offline");
  },
  // &tado=1: Home Assistant offers the timer action of Tado CE (Boost, Ručně platí).
  services: params.get("tado") ? { tado_ce: { set_climate_timer: {} } } : {},
  // The words of Home Assistant for a state (the real frontend translates every state).
  formatEntityState: (stateObj, state) => ({ closed: "Zavřeno", open: "Otevřeno", cool: "Chlazení", heat: "Topení", off: "Vypnuto", docked: "V doku", cleaning: "Uklízí" })[state ?? stateObj.state] ?? state ?? stateObj.state,
  callWS: async (message) => {
    if (message.type === "logbook/get_events") {
      test.logQueries.push(message);
      if (test.fail) throw new Error("offline");
      return test.logbook.filter((entry) => message.entity_ids.includes(entry.entity_id));
    }
    if (message.type !== "history/history_during_period") return {};
    test.lookups += 1;
    return Object.fromEntries(message.entity_ids.filter((id) => history[id]).map((id) => [id, history[id]]));
  },
};
card.hass = current;
test.card = card;
document.querySelector("main").append(card);
/** Home Assistant reporting new states. */
test.update = (changes) => {
  current = { ...current, states: { ...current.states, ...Object.fromEntries(Object.entries(changes).map(([id, value]) => [id, { ...current.states[id], ...value }])) } };
  card.hass = current;
};
window.addEventListener("hass-more-info", (event) => test.calls.push({ moreInfo: event.detail.entityId }));
test.ready = true;
