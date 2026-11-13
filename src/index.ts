import { defineControls } from "ha-dashboard-kit/controls";
import { HaDumDashboard } from "./ha-dum-dashboard";
import { getI18n, pageLanguage } from "./i18n";

// <dd-tile> and the other controls of the kit, named by the prefix of this card.
defineControls("dd");
if (!customElements.get("ha-dum-dashboard")) {
  customElements.define("ha-dum-dashboard", HaDumDashboard);
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === "ha-dum-dashboard")) {
  window.customCards.push({
    type: "ha-dum-dashboard",
    name: "Dům Dashboard",
    description: getI18n(pageLanguage()).t.cardDescription,
    preview: false,
  });
}

// Which build runs in Home Assistant (a stale cached module is the usual reason a change is "not there").
console.info(`%c DUM-DASHBOARD %c ${__BUILD__} `, "color:#fff;background:#0A6ED1;font-weight:700", "color:inherit");
