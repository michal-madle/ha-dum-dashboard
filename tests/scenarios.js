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
for (const item of config.running) states[item.entity] = entity("off");
for (const id of config.covers.entities) states[id] = entity("closed", { current_position: 0, current_tilt_position: 0, friendly_name: id });
states[config.ventilation.mode] = entity("off");
for (const fan of config.ventilation.fans) states[fan.entity] = entity("off");
const targets = [21, 19, 20, 20, 22.5, 8];
config.heating.rooms.forEach((room, index) => (states[room.entity] = entity("auto", { temperature: targets[index] })));
for (const room of config.cooling.rooms) states[room.entity] = entity("off", { temperature: 22, preset_mode: "none" });
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
  states["climate.pracovna_tado_ce_pracovna"] = entity("heat", { temperature: 22.5 });
  states["climate.garaz_tado_ce_garaz"] = entity("off", { temperature: 8 });
  states["climate.obyvak_ac_obyvak"] = entity("heat", { temperature: 23, preset_mode: "none" });
}
if (scenario === "summer") {
  states["input_select.house_mode"] = entity("Léto");
  states["cover.loznice_zaluzie_loznice"] = entity("open", { current_position: 100, current_tilt_position: 100 });
  states["climate.obyvak_ac_obyvak"] = entity("cool", { temperature: 22, preset_mode: "none" });
  states["climate.loznice_ac_loznice"] = entity("cool", { temperature: 24, preset_mode: "wind_free" });
  states["climate.maxik_ac_maxik"] = entity("unavailable");
}
if (scenario === "day") {
  for (const id of config.covers.entities) states[id] = entity("open", { current_position: 100, current_tilt_position: 97 });
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

const test = (window.__test = { config, calls: [], fail: false, history, lookups: 0 });
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
  callWS: async (message) => {
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
