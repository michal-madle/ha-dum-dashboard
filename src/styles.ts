import { css } from "lit";
import { paletteStyles } from "ha-dashboard-kit/palette";
import { typographyStyles } from "ha-dashboard-kit/typography";

/* Look of the card: the shared visual language (DASHBOARD_UX_SYSTEM.md); the tiles are the kit's. */
export const styles = [
  typographyStyles,
  paletteStyles("dd"),
  css`
  :host {
    display: block;
    /* The shared surfaces and texts are the kit's (paletteStyles, CURRENT_SPEC.md kitu, Barvy); only what is the card's own is set here. */
    --dd-page: var(--hdk-page);
    --dd-card: var(--hdk-card);
    --dd-el: var(--hdk-el);
    --dd-text: var(--hdk-text);
    --dd-secondary: var(--hdk-secondary);
    --dd-sep: var(--hdk-sep);
    --dd-button: var(--hdk-button);
    --dd-menu: #2c2c2e;
    --dd-accent: var(--hdk-blue);
    --dd-warning: #ff9230;
    --dd-warning-bg: rgb(255 146 48 / 16%);
    --dd-alert: #ff6961;
    --dd-alert-bg: rgb(255 66 69 / 18%);
    color: var(--dd-text);
  }
  :host([data-light]) {
    --dd-button: rgb(118 118 128 / 16%);
    --dd-menu: #ffffff;
    --dd-warning: #8f4a12;
    --dd-warning-bg: rgb(168 82 0 / 12%);
    --dd-alert: #c4001a;
    --dd-alert-bg: rgb(196 0 26 / 10%);
  }
  ha-card {
    /* Never wider than the screen: whatever does not fit wraps inside (overflow-wrap) or is clipped, the page never scrolls sideways. */
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: clip;
    padding: 4px 16px 20px;
    background: var(--dd-page);
    border: 0;
    box-shadow: none;
    color: inherit;
  }
  h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    min-height: 44px;
    margin: 4px 4px 0;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .chevron {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    margin: 0 -10px 0 0;
    padding: 0;
    border: 0;
    border-radius: 22px;
    background: none;
    color: var(--dd-secondary);
    font: inherit;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
  }
  .chevron:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
  }
  /* „Co se stalo“ has no heading: the gap of a section heading keeps it apart from the tiles above. */
  .group[data-part="log"] {
    margin-top: 24px;
  }
  .link-row {
    width: 100%;
    border: 0;
    background: none;
    color: var(--dd-text);
    font: inherit;
    text-align: start;
    cursor: pointer;
  }
  .link-row:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
    border-radius: 12px;
  }
  .chevron-mark {
    flex: none;
    color: var(--dd-secondary);
    font-size: 24px;
  }
  /* Popup of a light or a vacuum (CURRENT_SPEC.md, Popupy zařízení): rows of settings, each a name and value over a slider. */
  .device-detail {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 44px;
    font-size: 17px;
    line-height: 22px;
  }
  .setting {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .setting-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    font-size: 17px;
    line-height: 22px;
  }
  .setting-value {
    color: var(--dd-secondary);
    font-variant-numeric: tabular-nums;
  }
  /* A setting that does not change the light now (Jas po zapnutí) stands apart from the live ones. */
  .setting.apart {
    padding-top: 16px;
    border-top: 0.5px solid var(--dd-sep);
  }
  .swatch {
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1.5px rgb(128 128 128 / 50%);
    vertical-align: middle;
  }
  .setting small {
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .vacuum-map {
    display: block;
    width: 100%;
    max-height: 360px;
    margin: 0;
    object-fit: contain;
    border-radius: 12px;
    background: var(--dd-card);
  }
  .vacuum-map.empty {
    display: grid;
    place-items: center;
    min-height: 120px;
    color: var(--dd-secondary);
    font-size: 15px;
  }
  .vacuum-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .detail h3 {
    margin: 16px 0 4px;
    color: var(--dd-secondary);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    text-transform: uppercase;
  }
  .log-row {
    display: flex;
    gap: 12px;
    padding: 8px 0;
    border-top: 0.5px solid var(--dd-sep);
  }
  .log-time {
    flex: none;
    width: 48px;
    color: var(--dd-secondary);
    font-size: 15px;
    line-height: 22px;
  }
  .log-row .main {
    flex: 1;
    min-width: 0;
    font-size: 17px;
    line-height: 22px;
  }
  .log-members {
    display: block;
    font-size: 15px;
    line-height: 20px;
    color: var(--dd-secondary);
  }
  .log-row small {
    display: block;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .log-empty {
    color: var(--dd-secondary);
    font-size: 15px;
  }
  .rule {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 44px;
    padding: 8px 0;
    border: 0;
    border-top: 0.5px solid var(--dd-sep);
    background: none;
    color: var(--dd-text);
    font: inherit;
    font-size: 17px;
    line-height: 22px;
    text-align: start;
    cursor: pointer;
  }
  .rule .main {
    flex: 1;
    min-width: 0;
  }
  .rule:active,
  .link-row:active {
    background: var(--dd-sep);
  }
  .rule small {
    display: block;
    color: var(--dd-secondary);
    font-size: 15px;
    line-height: 20px;
  }
  .rule-off {
    color: var(--dd-secondary);
  }
  .rule:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
  }
  .health-row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    border-top: 0.5px solid var(--dd-sep);
    font-size: 17px;
    line-height: 22px;
  }
  .health-row.tap {
    cursor: pointer;
  }
  .health-row .main {
    flex: 1;
    min-width: 0;
  }
  .health-row .value {
    flex: none;
    color: var(--dd-secondary);
    font-size: 15px;
  }
  .health-row .value.warn {
    color: var(--dd-warning);
  }
  .cover-row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 64px;
    padding: 8px 0;
    border-top: 0.5px solid var(--dd-sep);
  }
  .cover-row:first-child {
    border-top: 0;
  }
  .cover-row .main {
    flex: 1;
    min-width: 0;
    font-size: 17px;
    line-height: 22px;
  }
  .cover-row small {
    display: block;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .row small.warn,
  .cover-row small.warn {
    color: var(--dd-warning);
  }
  .presets {
    display: grid;
    grid-template-columns: repeat(3, 64px);
    gap: 6px;
    flex: none;
  }
  @media (max-width: 359px) {
    .presets {
      grid-template-columns: repeat(3, 52px);
      gap: 4px;
    }
  }
  .link {
    position: relative;
    min-height: 44px;
    margin: 0 -4px 0 0;
    padding: 0 4px;
    border: 0;
    background: none;
    color: var(--dd-accent);
    font: inherit;
    font-size: 15px;
    line-height: 20px;
    text-transform: none;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .link .count {
    color: var(--dd-secondary);
  }
  .link:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
    border-radius: 8px;
  }
  .group {
    border-radius: 12px;
    background: var(--dd-card);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 60px;
    box-sizing: border-box;
    padding: 8px 12px;
    border-top: 0.5px solid var(--dd-sep);
  }
  .row:first-child {
    border-top: 0;
  }
  .row .main {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
    font-size: 17px;
    line-height: 22px;
  }
  /* A row with two buttons: they go under the text when the text would have less than about 160 px. */
  .row.two {
    flex-wrap: wrap;
    row-gap: 8px;
  }
  .row.two .main {
    flex: 1 1 160px;
  }
  /* The menu "Odložit" keeps to the right edge of the row, so it never leaves the card. */
  .actions {
    position: relative;
    display: flex;
    gap: 8px;
    margin-inline-start: auto;
  }
  .actions .snooze {
    position: static;
  }
  .row small {
    display: block;
    /* A long reason wraps, never pushes the card wider than the screen (iPhone). */
    overflow-wrap: anywhere;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .mark {
    display: grid;
    place-items: center;
    flex: none;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--dd-el);
    color: var(--dd-secondary);
    font-size: 17px;
    font-weight: 700;
  }
  .mark.warn {
    background: var(--dd-warning-bg);
    color: var(--dd-warning);
  }
  .mark.alert {
    background: var(--dd-alert-bg);
    color: var(--dd-alert);
  }
  /* Price between the nearest BUY and SELL: a hairline track and a dot; the numbers are in the line above, this only shows where the price is. */
  .scale {
    position: relative;
    display: block;
    height: 3px;
    margin: 9px 2px 2px;
    border-radius: 2px;
    background: var(--dd-sep);
  }
  .scale i {
    position: absolute;
    top: 50%;
    width: 9px;
    height: 9px;
    margin: -4.5px 0 0 -4.5px;
    border-radius: 50%;
    background: var(--dd-accent);
    box-shadow: 0 0 0 2px var(--dd-card);
  }
  .scale.out i {
    background: var(--dd-warning);
  }
  .row small.alert {
    color: var(--dd-alert);
  }
  .mark svg {
    width: 24px;
    height: 24px;
  }
  .button {
    flex: none;
    min-height: 44px;
    padding: 0 16px;
    border: 0;
    border-radius: 22px;
    background: var(--dd-button);
    color: var(--dd-text);
    font: inherit;
    font-size: 17px;
    line-height: 22px;
    cursor: pointer;
    white-space: nowrap;
  }
  /* Sent and on its way (spec kitu, Odezva): like a tile, the fill (button) or the colour (link) goes between its
     own and the accent until Home Assistant reports the result; with reduced motion a dashed accent outline. */
  .button.pending {
    animation: dd-pending-fill 1.3s ease-in-out infinite alternate;
  }
  .button.primary.pending {
    animation-name: dd-pending-primary;
  }
  .link.pending {
    animation: dd-pending-text 1.3s ease-in-out infinite alternate;
  }
  @keyframes dd-pending-fill {
    to {
      background: var(--dd-accent);
      color: #fff;
    }
  }
  @keyframes dd-pending-primary {
    to {
      background: var(--dd-button);
      color: var(--dd-text);
    }
  }
  @keyframes dd-pending-text {
    to {
      color: var(--dd-secondary);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .button.pending,
    .link.pending {
      animation: none;
      outline: 1.5px dashed var(--dd-accent);
      outline-offset: 2px;
    }
  }
  /* The quiet button of a row (Zkusit znovu, „Q219 A“): grey and 15 px, still 44 px high. */
  .button.small {
    padding: 0 12px;
    font-size: 15px;
    line-height: 20px;
  }
  /* An icon button (Zkusit znovu): a 44 px circle. */
  /* Limitní ordery: the update under the list and in the detail, the whole width. */
  .orders-update {
    width: 100%;
    margin-top: 12px;
  }
  .health-row .main small {
    display: block;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .orders-head {
    color: var(--dd-secondary);
    font-size: 13px;
  }
  .detail-actions {
    padding-top: 4px;
  }
  .button.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    padding: 0;
  }
  .button.icon svg {
    width: 22px;
    height: 22px;
  }
  .button.primary {
    background: #0a6ed1;
    color: #ffffff;
    font-weight: 600;
  }
  .button:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: 2px;
  }
  .snooze {
    position: relative;
    flex: none;
  }
  .menu {
    position: absolute;
    z-index: 5;
    top: calc(100% + 6px);
    right: 0;
    width: 230px;
    border-radius: 14px;
    background: var(--dd-menu);
    box-shadow: 0 8px 30px rgb(0 0 0 / 45%);
    overflow: hidden;
  }
  .menu button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    padding: 11px 16px;
    border: 0;
    border-top: 0.5px solid var(--dd-sep);
    background: none;
    color: var(--dd-text);
    font: inherit;
    font-size: 17px;
    line-height: 22px;
    text-align: start;
    cursor: pointer;
  }
  .menu button:first-child {
    border-top: 0;
  }
  .menu .until {
    color: var(--dd-secondary);
  }
  .menu button:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
  }
  .now {
    min-height: 52px;
    font-size: 15px;
    line-height: 20px;
  }
  .now.none {
    color: var(--dd-secondary);
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }
  .error {
    margin: 8px 4px 0;
    color: var(--dd-warning);
    font-size: 13px;
    line-height: 18px;
  }
`,
];
