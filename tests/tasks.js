// Test page of a card with only tasks (examples/ukoly.yaml): the queue „Potřebuje tebe“ from the attribute `ukoly`.
// Open /tests/tasks.html (&theme=light for Home Assistant's light mode).
import "/ha-dum-dashboard.js";
import { parse } from "/node_modules/yaml/browser/index.js";

const params = new URLSearchParams(location.search);
const light = params.get("theme") === "light";
const config = parse(await (await fetch("/examples/ukoly.yaml")).text());
const ukoly = [
  { klic: "platba:telefon", nazev: "Telefon", detail: "zítra (24.) · 1 147 Kč · Banka", akce: { sluzba: "input_boolean.turn_on", data: { entity_id: "input_boolean.platba_telefon" } } },
  { klic: "ordery", nazev: "Upravit limitní ordery", detail: "SXR8 BUY 677,88 → 692,52 · XDWD SELL nový 141,14", uroven: "warn", akce: { sluzba: "input_button.press", data: { entity_id: "input_button.ordery_aktualizovat" } } },
  { klic: "platba:najem", nazev: "Nájem", detail: "po splatnosti (5.) · 1 800 Kč · Banka", uroven: "alert", akce: { sluzba: "input_boolean.turn_on", data: { entity_id: "input_boolean.platba_najem" } } },
  { klic: "rebalance", nazev: "Rebalance XDWD", detail: "pod cílem o 5 832 € (−2,9 %) · dokoupit ručně", uroven: "warn" },
];
const states = { "sensor.ukoly": { state: String(ukoly.length), attributes: { ukoly }, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() } };
if (light) {
  document.documentElement.style.background = "#f2f2f7";
  document.body.style.background = "#f2f2f7";
  document.body.style.color = "#000";
}
const test = (window.__test = { config, calls: [] });
const card = document.createElement("ha-dum-dashboard");
card.setConfig(config);
let current = {
  states,
  themes: { darkMode: !light },
  user: { is_admin: true },
  language: "cs",
  locale: { language: "cs" },
  callService: async (domain, service, data) => test.calls.push({ domain, service, data }),
  formatEntityState: (stateObj) => stateObj.state,
  callWS: async () => ({}),
};
card.hass = current;
document.querySelector("main").append(card);
test.update = (changes) => {
  current = { ...current, states: { ...current.states, ...changes } };
  card.hass = current;
};
test.ready = true;
