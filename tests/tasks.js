// Test page of a card with only tasks (examples/ukoly.yaml): the queue „Potřebuje tebe“ from the attribute `ukoly`.
// Open /tests/tasks.html (&theme=light for Home Assistant's light mode).
import "/ha-dum-dashboard.js";
import { parse } from "/node_modules/yaml/browser/index.js";

const params = new URLSearchParams(location.search);
const light = params.get("theme") === "light";
const config = parse(await (await fetch(`/examples/${params.get("cfg") ?? "ukoly"}.yaml`)).text());
const ukoly = [
  { klic: "platba:telefon", nazev: "Telefon", detail: "zítra (24.) · 1 147 Kč · Banka", akce: { sluzba: "input_boolean.turn_on", data: { entity_id: "input_boolean.platba_telefon" } } },
  { klic: "platba:najem", nazev: "Nájem", detail: "po splatnosti (5.) · 1 800 Kč · Banka", uroven: "alert", akce: { sluzba: "input_boolean.turn_on", data: { entity_id: "input_boolean.platba_najem" } } },
  { klic: "rebalance", nazev: "Rebalance XDWD", detail: "pod cílem o 5 832 € (−2,9 %) · dokoupit ručně", uroven: "warn" },
];
const instrumenty = [
  { symbol: "SXR8", cena: 701.28, pozice: 140, jednotka: "ks", hodnota: 98179.2, cil: 98916.18, odchylka: -0.0075, upravit: true,
    ordery: [{ side: "BUY", mnozstvi: 3, ted: 677.88, nove: 692.52 }, { side: "SELL", mnozstvi: 3, ted: null, nove: 720.8 }] },
  { symbol: "XDWD", cena: 135.69, pozice: 1430, jednotka: "ks", hodnota: 194036.7, cil: 197832.36, odchylka: -0.0192, upravit: false,
    ordery: [{ side: "BUY", mnozstvi: 30, ted: 135.6, nove: 135.6 }, { side: "SELL", mnozstvi: 30, ted: 141.14, nove: 141.14 }] },
  { symbol: "BTC", cena: 55876, pozice: 0.30629835, jednotka: "BTC", hodnota: 17114.7, cil: 16888.16, odchylka: 0.0134, upravit: true,
    ordery: [{ side: "BUY", mnozstvi: 0.0025, ted: 55000, nove: 54750 }, { side: "BUY", mnozstvi: 0.0025, ted: null, nove: 54500 },
      { side: "SELL", mnozstvi: 0.0025, ted: 58500, nove: 56750 }, { side: "SELL", mnozstvi: 0.0025, ted: null, nove: 57000 }] },
];
const states = { "sensor.ordery": { state: "upravit", attributes: { instrumenty, cas: "2026-11-23 08:30", dry_run: true }, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() },
  "sensor.ukoly": { state: String(ukoly.length), attributes: { ukoly }, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() } };
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
