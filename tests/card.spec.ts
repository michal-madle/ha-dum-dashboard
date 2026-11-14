import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { axeViolations, joinedLines } from "ha-dashboard-kit/testing/helpers.mjs";
import { expect, test } from "./fixtures";
import type { Page } from "./fixtures";

// CURRENT_SPEC.md karty Dům (ha-config/dum/): první obrazovka.

type Call = { domain?: string; service?: string; data?: Record<string, unknown>; moreInfo?: string };

async function open(page: Page, scenario = "evening", theme: "dark" | "light" = "dark", lang = "cs", width = 393): Promise<void> {
  await page.setViewportSize({ width, height: 852 });
  await page.goto(`/tests/harness.html?s=${scenario}${theme === "light" ? "&theme=light" : ""}&lang=${lang}`);
  await page.waitForFunction(() => (window as any).__test?.ready === true);
  await page.locator("dd-tile").first().waitFor();
  await page.evaluate(() => document.fonts.ready.then(() => true));
}
const calls = (page: Page) => page.evaluate(() => (window as any).__test.calls as Call[]);
const update = (page: Page, changes: Record<string, unknown>) => page.evaluate((value) => (window as any).__test.update(value), changes);
const tiles = (page: Page, part: string) =>
  page.locator(`[data-part="${part}"] dd-tile`).evaluateAll((items) => items.map((item: any) => ({ name: item.name, text: item.text, state: item.state, count: item.count })));
const tile = (page: Page, part: string, name: string) => page.locator(`[data-part="${part}"] dd-tile`).filter({ hasText: name }).first();
const headings = (page: Page) => page.locator("h2 > span:first-child").allTextContents();

test.describe("fronta a co běží", () => {
  test("nepovedená akce je nahoře s důvodem a „Zkusit znovu“ pošle žaluzii znovu na cíl; slabá baterie má úroveň a typ", async ({ page }) => {
    await open(page);
    expect((await headings(page))[0]).toBe("Potřebuje tebe · 2");
    const rows = page.locator('[data-part="queue"] .row');
    await expect(rows).toHaveCount(2);
    await expect(rows.nth(0)).toContainText("Žaluzie Maxík");
    await expect(rows.nth(0)).toContainText("Žaluzie nedostupná");
    await expect(rows.nth(1)).toContainText("Okno Ložnice");
    await expect(rows.nth(1)).toContainText("Baterie 8 % · CR2032");
    // Žaluzie, která se pohnula a nedojela: kam měla dojet, ne čísla („Q219 A“).
    await update(page, { "sensor.dum_nesplnene_akce": { attributes: { polozky: [{ entita: "cover.maxik_zaluzie_maxik", akce: "poloha 0 %, lamely 0 %", duvod: "nedojela: poloha 40 %, lamely 30 %", cas: new Date().toISOString(), cil: { pos: "0", tilt: "0" } }] } } });
    await expect(rows.nth(0)).toContainText("Nedojela do Tma");
    await expect(rows.nth(0)).not.toContainText("40 %");
    await rows.nth(0).getByRole("button", { name: "Zkusit znovu" }).click();
    expect(await calls(page)).toEqual([{ domain: "script", service: "zaluzie_posun", data: { entity: "cover.maxik_zaluzie_maxik", pos: 0, tilt: 0 } }]);
  });

  test("akce bez cíle má „Hotovo“, které smaže jen tu položku; prázdná fronta řekne, že nic nečeká", async ({ page }) => {
    await open(page, "day");
    expect((await headings(page))[0]).toBe("Potřebuje tebe");
    await expect(page.locator('[data-part="queue"]')).toHaveText("Nic na tebe nečeká");
    await update(page, { "sensor.dum_nesplnene_akce": { state: "1", attributes: { polozky: [{ entita: "switch.technicka_mistnost_ventil_c1", akce: "mísení vody", duvod: "oba ventily zapnuté", cas: new Date().toISOString(), cil: "" }] } } });
    await page.locator('[data-part="queue"]').getByRole("button", { name: "Hotovo" }).click();
    expect(await calls(page)).toEqual([{ domain: "script", service: "dum_nesplnene_smazat", data: { entita: "switch.technicka_mistnost_ventil_c1" } }]);
  });

  test("Odložit: nabídka o den, na víkend, o týden, o měsíc jen překryje obsah; volba zavolá skript s dnem a odložená věc z fronty zmizí", async ({ page }) => {
    await open(page);
    const before = await page.locator("ha-card").boundingBox();
    const row = page.locator('[data-row="battery"]');
    await row.getByRole("button", { name: "Odložit" }).click();
    await expect(row.getByRole("menuitem")).toHaveText([/^O den/, /^Na víkend/, /^O týden/, /^O měsíc/]);
    expect(await page.locator("ha-card").boundingBox()).toEqual(before);
    // Klepnutí vedle nebo Escape nabídku zavře a nic neodešle.
    await page.locator('[data-part="running"]').click({ position: { x: 20, y: 20 } });
    await expect(row.getByRole("menuitem")).toHaveCount(0);
    await row.getByRole("button", { name: "Odložit" }).click();
    await page.keyboard.press("Escape");
    await expect(row.getByRole("menuitem")).toHaveCount(0);
    expect(await calls(page)).toEqual([]);
    await row.getByRole("button", { name: "Odložit" }).click();
    await row.getByRole("menuitem", { name: /O týden/ }).click();
    await expect(row.getByRole("menuitem")).toHaveCount(0);
    const day = (offset: number) => {
      const now = new Date();
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    };
    expect(await calls(page)).toEqual([{ domain: "script", service: "dum_odlozit", data: { klic: "battery:binary_sensor.loznice_okno_loznice_battery", do: day(7) } }]);
    await update(page, { "sensor.dum_odlozeno": { state: "1", attributes: { polozky: [{ klic: "battery:binary_sensor.loznice_okno_loznice_battery", do: day(7) }] } } });
    await expect(page.locator('[data-row="battery"]')).toHaveCount(0);
    expect((await headings(page))[0]).toBe("Potřebuje tebe · 1");
    // Den návratu je dnes: věc je ve frontě zpátky.
    await update(page, { "sensor.dum_odlozeno": { state: "1", attributes: { polozky: [{ klic: "battery:binary_sensor.loznice_okno_loznice_battery", do: day(0) }] } } });
    await expect(page.locator('[data-row="battery"]')).toHaveCount(1);
  });

  test("filtr klimatizace: úkol až od prahu, „Hotovo“ vynuluje hodiny, „Odložit“ ho schová; chybějící práh není úkol", async ({ page }) => {
    await open(page, "day");
    await expect(page.locator('[data-row="filter"]')).toHaveCount(0);
    await update(page, { "input_number.loznice_ac_loznice_filtr_hodiny": { state: "312.6" }, "input_number.maxik_ac_maxik_filtr_hodiny": { state: "900" }, "select.maxik_ac_maxik_dust_filter_alarm_threshold": { state: "unavailable" } });
    const row = page.locator('[data-row="filter"]');
    await expect(row).toHaveCount(1);
    await expect(row).toContainText("Klimatizace Ložnice");
    await expect(row).toContainText("Vyčistit filtr · 312 h z 300 h");
    expect((await headings(page))[0]).toBe("Potřebuje tebe · 1");
    await row.getByRole("button", { name: "Hotovo" }).click();
    expect(await calls(page)).toEqual([{ domain: "input_number", service: "set_value", data: { entity_id: "input_number.loznice_ac_loznice_filtr_hodiny", value: 0 } }]);
    await row.getByRole("button", { name: "Odložit" }).click();
    await row.getByRole("menuitem", { name: /O den/ }).click();
    expect((await calls(page))[1]).toMatchObject({ domain: "script", service: "dum_odlozit", data: { klic: "filter:input_number.loznice_ac_loznice_filtr_hodiny" } });
    const tomorrow = (await calls(page))[1].data!.do;
    await update(page, { "sensor.dum_odlozeno": { state: "1", attributes: { polozky: [{ klic: "filter:input_number.loznice_ac_loznice_filtr_hodiny", do: tomorrow }] } } });
    await expect(row).toHaveCount(0);
  });

  test("prádlo čeká: řádek s časem od konce cyklu, „Hotovo“ vypne pomocníka, „Odložit“ nemá", async ({ page }) => {
    await open(page, "day");
    await expect(page.locator('[data-row="laundry"]')).toHaveCount(0);
    const since = new Date(Date.now() - 50 * 60000);
    await update(page, { "input_boolean.technicka_mistnost_pracka_pradlo_ceka": { state: "on", last_changed: since.toISOString(), last_updated: since.toISOString() } });
    const row = page.locator('[data-row="laundry"]');
    await expect(row).toHaveCount(1);
    await expect(row).toContainText("Pračka");
    // Čas formátuje karta v časovém pásmu Home Assistantu; tady stačí tvar a minuty.
    const lines = await joinedLines(row.locator("small"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatch(new RegExp(`^Prádlo čeká · od \\d\\d:${String(since.getMinutes()).padStart(2, "0")}$`));
    expect((await headings(page))[0]).toBe("Potřebuje tebe · 1");
    await row.getByRole("button", { name: "Hotovo" }).click();
    expect(await calls(page)).toContainEqual({ domain: "input_boolean", service: "turn_off", data: { entity_id: "input_boolean.technicka_mistnost_pracka_pradlo_ceka" } });
    // Prádlo na týden odložit nejde (uživatel 13. 11. 2026).
    await expect(row.getByRole("button", { name: "Odložit" })).toHaveCount(0);
  });

  test("údržba podle cyklů: úkol od intervalu z konfigurace, „Hotovo“ vynuluje počítadlo, „Odložit“ ho schová", async ({ page }) => {
    await open(page, "day");
    await expect(page.locator('[data-row="maintenance"]')).toHaveCount(0);
    await update(page, { "counter.technicka_mistnost_pracka_cykly_od_udrzby": { state: "41" }, "counter.kuchyne_mycka_cykly_od_udrzby": { state: "29" } });
    const row = page.locator('[data-row="maintenance"]');
    await expect(row).toHaveCount(1);
    await expect(row).toContainText("Pračka");
    expect((await joinedLines(row.locator("small"))).join(" · ")).toBe("Vyčistit buben · 41 z 40 cyklů");
    await row.getByRole("button", { name: "Hotovo" }).click();
    expect(await calls(page)).toEqual([{ domain: "counter", service: "reset", data: { entity_id: "counter.technicka_mistnost_pracka_cykly_od_udrzby" } }]);
    await row.getByRole("button", { name: "Odložit" }).click();
    await row.getByRole("menuitem", { name: /O týden/ }).click();
    expect((await calls(page))[1]).toMatchObject({ service: "dum_odlozit", data: { klic: "maintenance:counter.technicka_mistnost_pracka_cykly_od_udrzby" } });
  });

  test("text z částí: na 320 px se zalomí v místě tečky (tečka zmizí) nebo teče bez tečky na kraji řádku; na 393 px je na jednom řádku", async ({ page }) => {
    await open(page, "evening", "dark", "cs", 320);
    const battery = page.locator('[data-row="battery"] small');
    expect(await joinedLines(battery)).toEqual(["Baterie 8 %", "CR2032"]);
    await expect(battery.locator(".joined")).toHaveClass(/stacked/);
    // „žaluzie nedostupná“ se nevejde ani na vlastní řádek: souvislý text, tečka drží u předchozího slova.
    await expect(page.locator('[data-row="failed"] small .joined')).toHaveClass(/flow/);
    await page.setViewportSize({ width: 393, height: 852 });
    await expect.poll(() => joinedLines(battery)).toEqual(["Baterie 8 % · CR2032"]);
  });

  test("Teď běží: spotřebiče s dobou běhu a jednotkou, jinak „Nic neběží“", async ({ page }) => {
    await open(page);
    await expect(page.locator('[data-part="running"]')).toHaveText("Pračka 42 min · Myčka 1 h 5 min");
    await open(page, "day");
    await expect(page.locator('[data-part="running"]')).toHaveText("Nic neběží");
  });

  test("restart Home Assistantu nezačne doby znovu: Teď běží i větrák berou začátek z historie, bez historie platí last_changed", async ({ page }) => {
    await open(page, "restart");
    // Pračka: off, on před 30 min, on znovu při restartu (stejný stav). Myčka historii nemá.
    await expect(page.locator('[data-part="running"]')).toHaveText("Pračka 30 min · Myčka 2 min");
    // Větrák: mezera unavailable při restartu běh nepřeruší.
    await expect(tile(page, "ventilation", "Záchod patro")).toBeVisible();
    expect((await tiles(page, "ventilation")).find((item) => item.name === "Záchod patro")?.text).toBe("Běží 25 min");
    // Jeden dotaz na všechny entity, nepřeptává se při každém překreslení.
    const lookups = await page.evaluate(() => (window as any).__test.lookups as number);
    expect(lookups).toBeGreaterThanOrEqual(1);
    await update(page, { "input_select.house_mode": { state: "Léto" } });
    await page.waitForTimeout(100);
    expect(await page.evaluate(() => (window as any).__test.lookups as number)).toBe(lookups);
  });
});

test.describe("Co se stalo", () => {
  test("řádek ukáže počet nových, list je rozdělí na „Od minulého otevření“ a „Dříve dnes“ s časem a důvodem; zavření je označí jako viděné", async ({ page }) => {
    // Bez animace listu (axe by měřil kontrast během náběhu).
    await page.emulateMedia({ reducedMotion: "reduce" });
    // Naposledy viděno před hodinou (toto zařízení).
    await page.addInitScript(() => localStorage.setItem("dum-dashboard.log-seen", String(Date.now() - 3600000)));
    await open(page);
    const row = page.locator('[data-part="log"] button').first();
    await expect(row).toContainText("Co se stalo");
    await expect(row).toContainText("3 nové události od");
    const query = await page.evaluate(() => {
      const first = (window as any).__test.logQueries[0];
      return { entities: first.entity_ids as string[], hour: new Date(first.start_time).getHours(), minute: new Date(first.start_time).getMinutes() };
    });
    expect(query.entities).toContain("cover.loznice_zaluzie_loznice");
    // Od půlnoci (místní čas).
    expect([query.hour, query.minute]).toEqual([0, 0]);
    await row.click();
    const sheet = page.locator('[data-part="log-detail"]');
    await expect(sheet.locator("h3")).toHaveText(["Od minulého otevření", "Dříve dnes"]);
    // Nedostupná a pohyb žaluzie („closing“) se nevypisují; důvod je automatika nebo „Aplikace“.
    await expect(sheet.locator(".log-row")).toHaveCount(5);
    // Spotřebič slovy, ne pomocník; žaluzie bez důvodu v deníku vezme důvod z poslední akce.
    await expect(sheet.locator(".log-row").filter({ hasText: "Sušička" })).toContainText("Sušička · Doběhla");
    await expect(sheet.locator(".log-row").filter({ hasText: "Sušička" }).locator("small")).toHaveText("Konec cyklu");
    await expect(sheet.locator(".log-row").filter({ hasText: "Žaluzie Maxík" })).toContainText("Večerní fáze");
    // Jedna chvíle = jeden řádek: příčina (Aplikace zapnula Větrací režim) a pod ní, co následovalo, po druzích.
    const moment = sheet.locator(".log-row").filter({ hasText: "Větrací režim · Zapnuto" });
    await expect(moment).toHaveCount(1);
    await expect(moment.locator("small")).toHaveText("Aplikace");
    await expect(moment.locator(".log-members")).toHaveText(["Větrání · Zapnuto: Koupelna přízemí, Koupelna patro", "Žaluzie · Otevřeno: Mikuláš"]);
    // Bez záznamu polohy stav slovem.
    await expect(sheet.locator(".log-row").filter({ hasText: "Žaluzie Maxík" })).toContainText("Žaluzie Maxík · Zavřeno");
    // Hromadná akce je jeden řádek se seznamem menším písmem; důvod z pohybu žaluzie.
    await expect(sheet.locator(".log-row").first().locator(".main")).toContainText("Žaluzie · Tma");
    await expect(sheet.locator(".log-row").first().locator(".log-members")).toHaveText("Ložnice, Pracovna");
    await expect(sheet.locator(".log-row").first()).toContainText("Večerní fáze");
    await expect(sheet.locator(".log-row").filter({ hasText: "Klimatizace" })).toContainText("Aplikace");
    expect(await axeViolations(page, ["page-has-heading-one"])).toEqual([]);
    await page.locator("dd-sheet .close").last().click();
    await expect(row).toContainText("Nic nového");
  });

  test("naposledy viděno včera: počet je ode dneška („N událostí dnes“), ne „od“ včerejšího času", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("dum-dashboard.log-seen", String(Date.now() - 2 * 86400000)));
    await open(page);
    await expect(page.locator('[data-part="log"] button').first()).toContainText("5 událostí dnes");
  });

  test("Pravidla domu: jen pro správce; list automatizací podle jména s popisem z Home Assistantu, vypnutá řekne Vypnuto, klepnutí otevře detail", async ({ page }) => {
    await open(page);
    await page.locator('[data-row="rules"]').click();
    const rules = page.locator('[data-part="rules-detail"] .rule');
    await expect(rules).toHaveCount(2);
    await expect(rules.nth(0)).toContainText("Spustí časovač, zapne větráky a stojanový ventilátor.");
    await expect(rules.nth(1)).toContainText("Žaluzie večer · Vypnuto");
    await expect(rules.nth(1).locator("small")).toHaveCount(0);
    await rules.nth(0).click();
    expect((await calls(page)).at(-1)).toEqual({ moreInfo: "automation.vetrani_zapnuti" });
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto("/tests/harness.html?s=evening&lang=cs&admin=0");
    await page.waitForFunction(() => (window as any).__test?.ready === true);
    await expect(page.locator('[data-part="log"] button').first()).toBeVisible();
    await expect(page.locator('[data-row="rules"]')).toHaveCount(0);
  });

  test("bez deníku řekne, že se nepodařil načíst; prázdný den „Dnes se nic nestalo.“", async ({ page }) => {
    await open(page);
    await page.evaluate(() => { (window as any).__test.logbook = []; });
    await page.locator('[data-part="log"] button').first().click();
    await expect(page.locator('[data-part="log-detail"]')).toHaveText("Dnes se nic nestalo.");
    await page.locator("dd-sheet .close").last().click();
    // Nepovedené obnovení nechá, co už bylo načtené.
    await page.evaluate(() => { (window as any).__test.fail = true; });
    await page.locator('[data-part="log"] button').first().click();
    await expect(page.locator('[data-part="log-detail"]')).toHaveText("Dnes se nic nestalo.");
    await page.locator("dd-sheet .close").last().click();
    // Deník, který se nenačetl nikdy, to řekne.
    await page.evaluate(() => { (window as any).__test.card._log = undefined; });
    await page.locator('[data-part="log"] button').first().click();
    await expect(page.locator('[data-part="log-detail"]')).toHaveText("Deník se nepodařilo načíst.");
  });
});

test.describe("ovládání", () => {
  test("pořadí oddílů: Žaluzie, Větrání a potom Topení a Klimatizace podle režimu domu", async ({ page }) => {
    await open(page);
    expect((await headings(page)).slice(2)).toEqual(["Žaluzie", "Větrání", "Topení", "Klimatizace", "Světla", "Zásuvky", "Vysavače", "Zdraví"]);
    await open(page, "summer");
    expect((await headings(page)).slice(2)).toEqual(["Žaluzie", "Větrání", "Klimatizace", "Topení", "Světla", "Zásuvky", "Vysavače", "Zdraví"]);
  });

  test("žaluzie: předvolba všech svítí, smíšený stav má počet, nedostupná žaluzie se nepočítá do žádné", async ({ page }) => {
    await open(page, "day");
    expect(await tiles(page, "covers")).toEqual([{ name: "Den", text: "", state: "on" }, { name: "Stín", text: "", state: "idle" }, { name: "Tma", text: "", state: "idle" }]);
    await open(page, "summer");
    expect((await tiles(page, "covers")).map((item) => [item.state, item.count])).toEqual([["mixed", 1], ["idle", undefined], ["mixed", 3]]);
    await open(page);
    expect((await tiles(page, "covers"))[2]).toEqual({ name: "Tma", text: "", state: "mixed", count: 3 });
  });

  test("žaluzie jsou chráněné: jedno klepnutí jen nápověda a nic se nehne, dvojklep pošle předvolbu všem žaluziím", async ({ page }) => {
    await open(page, "day");
    const before = await page.locator("ha-card").boundingBox();
    await tile(page, "covers", "Tma").click();
    await expect(tile(page, "covers", "Tma").locator(".hint")).toHaveText("Podrž nebo klepni dvakrát");
    expect(await calls(page)).toEqual([]);
    expect(await page.locator("ha-card").boundingBox()).toEqual(before);
    await page.waitForTimeout(500);
    await tile(page, "covers", "Tma").dblclick();
    const sent = await calls(page);
    expect(sent.length).toBe(4);
    expect(sent[0]).toEqual({ domain: "script", service: "zaluzie_posun", data: { entity: "cover.loznice_zaluzie_loznice", pos: 0, tilt: 0 } });
  });

  test("odezva: odeslaná předvolba pulzuje, dokud žaluzie nedojedou; bez změny po 5 s přestane", async ({ page }) => {
    await open(page, "day");
    const covers = ["cover.loznice_zaluzie_loznice", "cover.maxik_zaluzie_maxik", "cover.mikulas_zaluzie_mikulas", "cover.pracovna_zaluzie_pracovna"];
    const dark = tile(page, "covers", "Tma");
    await dark.dblclick();
    await expect(dark).toHaveAttribute("pending", "");
    await update(page, Object.fromEntries(covers.map((id) => [id, { state: "closing", attributes: { current_position: 40, current_tilt_position: 40 } }])));
    await expect(dark).toHaveAttribute("pending", "");
    await update(page, Object.fromEntries(covers.map((id) => [id, { state: "closed", attributes: { current_position: 0, current_tilt_position: 0 } }])));
    await expect(dark).not.toHaveAttribute("pending", "");
    // Nic se nehne: po 5 s bez změny přestane.
    const day = tile(page, "covers", "Den");
    await day.dblclick();
    await expect(day).toHaveAttribute("pending", "");
    await expect(day).not.toHaveAttribute("pending", "", { timeout: 7000 });
  });

  test("detail žaluzií: šipka u nadpisu otevře list, u místnosti poslední akce (nepovedená oranžově) a předvolba jen pro ni jedním klepnutím", async ({ page }) => {
    await open(page);
    const before = await page.locator("ha-card").boundingBox();
    await page.getByRole("button", { name: "Podrobnosti žaluzií" }).click();
    const dialog = page.getByRole("dialog", { name: "Žaluzie" });
    await expect(dialog).toBeVisible();
    expect(await page.locator("ha-card").boundingBox()).toEqual(before);
    const rows = page.locator('[data-part="covers-detail"] .cover-row');
    await expect(rows).toHaveCount(4);
    await expect(rows.nth(0)).toContainText("Ložnice");
    await expect(rows.nth(0).locator("small")).toContainText(/^Večerní fáze\s\d\d:\d\d$/);
    await expect(rows.nth(0).locator("small")).not.toHaveClass(/warn/);
    // Maxík: nepovedená akce má přednost před poslední akcí.
    await expect(rows.nth(1).locator("small")).toHaveClass(/warn/);
    await expect(rows.nth(1).locator("small")).toContainText("Nedojela");
    await expect(rows.nth(1).locator("small")).toContainText("žaluzie nedostupná");
    // Tma svítí u zatažené žaluzie, Den ne.
    const tileStates = await rows.nth(0).locator("dd-tile").evaluateAll((items) => items.map((item: any) => item.state));
    expect(tileStates).toEqual(["idle", "idle", "on"]);
    await rows.nth(3).locator("dd-tile").first().click();
    expect(await calls(page)).toEqual([{ domain: "script", service: "zaluzie_posun", data: { entity: "cover.pracovna_zaluzie_pracovna", pos: 100, tilt: 100 } }]);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test("detail žaluzií: ruční pohyb a jiný den; 320 px bez vodorovného posouvání, axe tmavě i světle", async ({ page }) => {
    for (const theme of ["dark", "light"] as const) {
      await open(page, "day", theme, "cs", 320);
      // Axe measures the finished sheet, not its fade-in.
      await page.emulateMedia({ reducedMotion: "reduce" });
      const yesterday = new Date(Date.now() - 26 * 3600000).toISOString();
      await update(page, {
        "sensor.zaluzie_posledni_akce": { attributes: { polozky: { "cover.loznice_zaluzie_loznice": { kdo: "rucne", cas: yesterday } } } },
        "sensor.dum_nesplnene_akce": { state: "1", attributes: { polozky: [{ entita: "cover.mikulas_zaluzie_mikulas", akce: "x", duvod: "žaluzie nedostupná", cas: new Date().toISOString() }] } },
      });
      await page.getByRole("button", { name: "Podrobnosti žaluzií" }).click();
      const rows = page.locator('[data-part="covers-detail"] .cover-row');
      await expect(rows.nth(0).locator("small")).toContainText(/^Ručně\s\d/);
      await expect(rows.nth(1).locator("small")).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
      // Text pod názvem nesmí vjet pod předvolby.
      const overlap = await page.locator('[data-part="covers-detail"] .cover-row').evaluateAll((items) =>
        items.filter((row) => {
          const text = row.querySelector("small")?.getBoundingClientRect();
          const presets = row.querySelector(".presets")!.getBoundingClientRect();
          return text && [...row.querySelectorAll("small .joined-part, small")].some((el) => el.getBoundingClientRect().right > presets.left + 0.5);
        }).length,
      );
      expect(overlap, theme).toBe(0);
      expect(await axeViolations(page, ["page-has-heading-one"]), theme).toEqual([]);
    }
  });

  test("větrání: Větrací režim je první dlaždice, běžící větrák ukáže dobu, přepnutí jen dvojklepem nebo podržením", async ({ page }) => {
    await open(page);
    const list = await tiles(page, "ventilation");
    expect(list.map((item) => item.name)).toEqual(["Větrací režim", "Koupelna přízemí", "Koupelna patro", "Koupelna ložnice", "Záchod patro", "Stojanový ventilátor"]);
    expect(list[4]).toEqual({ name: "Záchod patro", text: "Běží 8 min", state: "on" });
    expect(list[0]).toEqual({ name: "Větrací režim", text: "Vypnuto", state: "off" });
    await tile(page, "ventilation", "Větrací režim").click();
    expect(await calls(page)).toEqual([]);
    await page.waitForTimeout(500);
    await tile(page, "ventilation", "Větrací režim").dblclick();
    const box = (await tile(page, "ventilation", "Záchod patro").boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(700);
    await page.mouse.up();
    expect(await calls(page)).toEqual([
      { domain: "homeassistant", service: "turn_on", data: { entity_id: "input_boolean.ventilation_mode" } },
      { domain: "homeassistant", service: "turn_off", data: { entity_id: "switch.koupelna_vetrak_zachod_patro" } },
    ]);
  });

  test("topení: plán, ručně a vypnuto vypadají různě; „Zpět na plán“ je chráněný odkaz jen při ručním přepisu", async ({ page }) => {
    await open(page);
    const list = await tiles(page, "heating");
    expect(list[0]).toEqual({ name: "Obývák", text: "Plán · 21°", state: "idle" });
    expect(list[4]).toEqual({ name: "Pracovna", text: "Ručně · 22,5°", state: "on" });
    expect(list[5]).toEqual({ name: "Garáž", text: "Vypnuto", state: "off" });
    const link = page.locator('[data-link="resume"]');
    await expect(link).toHaveText("1 ručně · Zpět na plán");
    await link.click();
    await expect(link.locator(".hint")).toHaveText("Podrž nebo klepni dvakrát");
    expect(await calls(page)).toEqual([]);
    await page.waitForTimeout(500);
    await link.dblclick();
    expect(await calls(page)).toEqual([{ domain: "button", service: "press", data: { entity_id: "button.tado_ce_hub_resume_all_schedules" } }]);
    await open(page, "day");
    await expect(page.locator('[data-link="resume"]')).toHaveCount(0);
  });

  test("klimatizace: režim a celé stupně, WindFree, nedostupná; „Vypnout vše“ vypne jen běžící", async ({ page }) => {
    await open(page, "summer");
    const list = await tiles(page, "cooling");
    expect(list.slice(0, 3)).toEqual([
      { name: "Obývák", text: "Chlazení · 22°", state: "on" },
      { name: "Ložnice", text: "WindFree · 24°", state: "on" },
      { name: "Maxík", text: "Nedostupné", state: "off" },
    ]);
    await page.locator('[data-link="alloff"]').dblclick();
    expect(await calls(page)).toEqual([{ domain: "climate", service: "turn_off", data: { entity_id: ["climate.obyvak_ac_obyvak", "climate.loznice_ac_loznice"] } }]);
    await open(page, "day");
    await expect(page.locator('[data-link="alloff"]')).toHaveCount(0);
  });

  test("popup Klimatizace: dlaždice ho otevře jedním klepnutím s tou místností, klepnutí na jinou zapnutou vybere všechny zapnuté, zavření změnu hned odešle", async ({ page }) => {
    await open(page, "summer");
    await tile(page, "cooling", "Obývák").click();
    const dialog = page.getByRole("dialog", { name: "Klimatizace" });
    await expect(dialog).toBeVisible();
    const selected = () => page.locator("dd-climate .rooms dd-tile").evaluateAll((items) => items.filter((item: any) => item.pressed).map((item: any) => item.name));
    expect(await selected()).toEqual(["Obývák"]);
    await expect(page.locator("dd-climate .big")).toHaveText("22°");
    await page.locator("dd-climate .rooms dd-tile").filter({ hasText: "Ložnice" }).click();
    expect(await selected()).toEqual(["Obývák", "Ložnice"]);
    await expect(page.locator("dd-climate .big")).toHaveText("22–24°");
    await page.locator("dd-climate .modes dd-tile").filter({ hasText: "Chlazení" }).click();
    await expect(page.locator("dd-climate .busy")).toBeVisible();
    expect(await calls(page)).toEqual([]);
    await page.getByRole("button", { name: "Zavřít" }).click();
    await expect(dialog).toHaveCount(0);
    expect(await calls(page)).toEqual([
      { domain: "climate", service: "set_hvac_mode", data: { entity_id: "climate.obyvak_ac_obyvak", hvac_mode: "cool" } },
      { domain: "climate", service: "set_hvac_mode", data: { entity_id: "climate.loznice_ac_loznice", hvac_mode: "cool" } },
      { domain: "climate", service: "set_preset_mode", data: { entity_id: "climate.loznice_ac_loznice", preset_mode: "none" } },
    ]);
  });

  test("popup Klimatizace: síla větru a směr proudění; „Detail a historie“ odešle, zavře popup a otevře detail entity", async ({ page }) => {
    await open(page, "summer");
    await tile(page, "cooling", "Obývák").click();
    await expect(page.locator("dd-climate h3")).toHaveText(["Režim", "Síla větru", "Směr proudění", "Vypnout za"]);
    await page.locator("dd-climate dd-segmented").nth(0).getByRole("radio", { name: "Vysoká" }).click();
    await page.getByRole("button", { name: "Detail a historie" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    expect(await calls(page)).toEqual([
      { domain: "climate", service: "set_fan_mode", data: { entity_id: "climate.obyvak_ac_obyvak", fan_mode: "high" } },
      { moreInfo: "climate.obyvak_ac_obyvak" },
    ]);
  });

  test("popup Topení: jen jeden systém bez přepínače; posunutí teploty je Ručně, odešle se po prodlevě z konfigurace", async ({ page }) => {
    await open(page);
    await tile(page, "heating", "Pracovna").click();
    await expect(page.getByRole("dialog", { name: "Topení" })).toBeVisible();
    await expect(page.locator("dd-climate .big")).toHaveText("22,5°");
    await expect(page.getByRole("tab")).toHaveCount(0);
    await page.locator("dd-climate dd-slider input").fill("21");
    await page.locator("dd-climate dd-slider input").dispatchEvent("change");
    await expect.poll(() => calls(page), { timeout: 4000 }).toEqual([
      { domain: "climate", service: "set_temperature", data: { entity_id: "climate.pracovna_tado_ce_pracovna", temperature: 21, hvac_mode: "heat" } },
    ]);
  });

  test("popup 320 px: bez vodorovného posouvání, axe tmavě i světle", async ({ page }) => {
    for (const theme of ["dark", "light"] as const) {
      await open(page, "summer", theme, "cs", 320);
      // Axe measures the finished sheet, not its fade-in.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await tile(page, "cooling", "Obývák").click();
      await page.locator("dd-climate .big").waitFor();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
      expect(await axeViolations(page, ["page-has-heading-one"]), theme).toEqual([]);
    }
  });

  test("další zařízení: každý druh vlastní oddíl za klimatizací; světlo přepne dvojklep a bliká do potvrzení; vysavač dvojklepem spustí úklid nebo jede do doku", async ({ page }) => {
    await open(page);
    const names = await headings(page);
    expect(names.slice(names.indexOf("Klimatizace") + 1)).toEqual(["Světla", "Zásuvky", "Vysavače", "Zdraví"]);
    expect((await tiles(page, "devices-0")).map((item) => [item.name, item.text, item.state])).toEqual([
      ["Kuchyně", "Zapnuto", "on"],
      ["Lampa pracovna", "Vypnuto", "off"],
    ]);
    const lamp = tile(page, "devices-0", "Lampa pracovna");
    await lamp.dblclick();
    expect((await calls(page)).at(-1)).toEqual({ domain: "homeassistant", service: "turn_on", data: { entity_id: "light.yeelink_bslamp2_cd35_light" } });
    await expect(lamp).toHaveAttribute("pending", "");
    await update(page, { "light.yeelink_bslamp2_cd35_light": { state: "on" } });
    await expect(lamp).not.toHaveAttribute("pending", "");
    expect((await tiles(page, "devices-2")).map((item) => item.text)).toEqual(["V doku", "Uklízí · 12 min"]);
    // Vysavač: dvojklep spustí úklid, uklízející pošle do doku („Q221 A“).
    await tile(page, "devices-2", "Patro").dblclick();
    expect((await calls(page)).at(-1)).toEqual({ domain: "vacuum", service: "start", data: { entity_id: "vacuum.roborock_s5_ea9e_robot_cleaner" } });
    await expect(tile(page, "devices-2", "Patro")).toHaveAttribute("pending", "");
    await page.waitForTimeout(500);
    await tile(page, "devices-2", "Přízemí").dblclick();
    expect((await calls(page)).at(-1)).toEqual({ domain: "vacuum", service: "return_to_base", data: { entity_id: "vacuum.technicka_mistnost_roborock_prizemi_robot_cleaner" } });
  });

  test("Zdraví: „Vyžaduje pozornost“ jen při problému; řádek na část se shrnutím otevře list; aktualizace z celého Home Assistantu", async ({ page }) => {
    await open(page);
    const health = page.locator('[data-part="health"]');
    // Slabá baterie je ve frontě, ve „Vyžaduje pozornost“ znovu ne („Q224 A“); Okno Maxík 15 % ve frontě není.
    await expect(health.locator('[data-row="attention"]')).toContainText("Okno Maxík 15 %");
    await expect(health.locator('[data-row="attention"]')).not.toContainText("Okno Ložnice");
    await expect(health.locator('[data-health="batteries"]')).toContainText("Nejslabší Okno Ložnice 8 %");
    await expect(health.locator('[data-health="connections"]')).toContainText("Vše připojeno");
    await expect(health.locator('[data-health="system"]')).toContainText("V pořádku");
    await expect(health.locator('[data-health="updates"]')).toContainText("1 dostupná");
    await health.locator('[data-health="batteries"]').click();
    const rows = page.locator('[data-part="health-detail"] .health-row');
    await expect(rows.first()).toContainText("Okno Ložnice");
    await expect(rows).toHaveCount(7);
    await page.locator("dd-sheet .close").last().click();
    // Odpojené čidlo a vadný disk jdou nahoru.
    await update(page, { "binary_sensor.maxik_tado_ce_maxik_connection": { state: "off" }, "binary_sensor.madlovi_drive_2_exceeded_max_bad_sectors": { state: "on" }, "sensor.madlovi_volume_1_volume_used": { state: "91" } });
    // Obsazení nad mezí 85 % („Q223 ano“).
    await expect(health.locator('[data-row="attention"]')).toContainText("NAS obsazeno");
    await expect(health.locator('[data-row="attention"]')).toContainText("Tado Maxík odpojeno");
    await expect(health.locator('[data-row="attention"]')).toContainText("NAS disk 2 sektory");
    await expect(health.locator('[data-health="connections"]')).toContainText("1 odpojeno");
    await health.locator('[data-health="updates"]').click();
    await page.locator('[data-part="health-detail"] .health-row').first().click();
    expect((await calls(page)).at(-1)).toEqual({ moreInfo: "update.madlovi_dsm_update" });
  });

  test("chyba volání Home Assistantu je vidět v kartě", async ({ page }) => {
    await open(page, "day");
    await page.evaluate(() => ((window as any).__test.fail = true));
    await tile(page, "ventilation", "Koupelna patro").dblclick();
    await expect(page.locator(".error")).toContainText("Nepodařilo se: offline");
  });
});

test.describe("konfigurace, jazyky, mobil a přístupnost", () => {
  const example = () => parse(readFileSync(new URL("../examples/dum.yaml", import.meta.url), "utf8"));
  const configError = (page: Page, config: unknown) =>
    page.evaluate((value) => {
      try {
        (document.createElement("ha-dum-dashboard") as unknown as { setConfig(value: unknown): void }).setConfig(value);
        return "";
      } catch (error) {
        return (error as Error).message;
      }
    }, config);

  test("příklad je platný; chybná hodnota jmenuje klíč, neznámý klíč v oddílu je chyba, prázdná konfigurace projde", async ({ page }) => {
    await open(page, "day");
    expect(await configError(page, example())).toBe("");
    expect(await configError(page, { type: "custom:ha-dum-dashboard" })).toBe("");
    expect(await configError(page, { ...example(), failed_actions: "switch.x" })).toBe("Dům Dashboard: failed_actions must be a sensor entity (sensor.…), not switch.x.");
    expect(await configError(page, { ...example(), covers: { ...example().covers, speed: 1 } })).toContain('covers: unknown key "speed"');
    expect(await configError(page, { ...example(), guard: { hold_ms: 5 } })).toBe("Dům Dashboard: guard.hold_ms must be a number from 200 to 3000.");
    expect(await configError(page, { ...example(), filters: [{ name: "X", hours: "sensor.x", threshold: "select.y" }] })).toBe("Dům Dashboard: filters[0].hours must be a input_number entity (input_number.…), not sensor.x.");
    expect(await configError(page, { ...example(), maintenance: [{ name: "X", task: "Y", counter: "sensor.x", every: 30 }] })).toBe("Dům Dashboard: maintenance[0].counter must be a counter entity (counter.…), not sensor.x.");
    expect(await configError(page, { ...example(), heating: { rooms: [{ name: "X", entity: "switch.x" }] } })).toBe("Dům Dashboard: heating.rooms[0].entity must be one of climate, not switch.x.");
  });

  test("en a sv: žádný český text karty", async ({ page }) => {
    for (const [lang, title, off] of [["en", "Needs you · 2", "Off"], ["sv", "Behöver dig · 2", "Av"]] as const) {
      await open(page, "evening", "dark", lang);
      expect((await headings(page))[0]).toBe(title);
      expect((await tiles(page, "ventilation"))[1].text).toBe(off);
      const text = await page.locator("ha-dum-dashboard").evaluate((card) => (card.shadowRoot!.querySelector("ha-card") as HTMLElement).innerText);
      for (const czech of ["Potřebuje", "Teď běží", "Žaluzie\n", "Větrání", "Zkusit", "Zpět na plán", "Vypnout"]) expect(text, `${lang}: ${czech}`).not.toContain(czech);
    }
  });

  test("320 až 430 px: bez vodorovného posouvání, cíle aspoň 44 px; axe v tmavém i světlém režimu", async ({ page }) => {
    for (const width of [320, 393, 430]) {
      await open(page, "evening", "dark", "cs", width);
      // A task with two buttons is the widest row of the queue.
      await update(page, { "input_number.pracovna_ac_pracovna_filtr_hodiny": { state: "305" } });
      await page.locator('[data-row="filter"]').waitFor();
      // The menu "Odložit" of the row stays inside the screen.
      await page.locator('[data-row="filter"]').getByRole("button", { name: "Odložit" }).click();
      const menu = await page.locator('[data-row="filter"] [role="menu"]').boundingBox();
      expect(menu!.x, `šířka ${width}`).toBeGreaterThanOrEqual(0);
      expect(menu!.x + menu!.width, `šířka ${width}`).toBeLessThanOrEqual(width);
      await page.keyboard.press("Escape");
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `šířka ${width}`).toBeLessThanOrEqual(width);
      const small = await page.locator("ha-dum-dashboard").evaluate((card) => {
        const out: string[] = [];
        const check = (element: Element) => {
          const box = element.getBoundingClientRect();
          if (box.width < 44 || box.height < 44) out.push(`${element.textContent?.trim()} ${Math.round(box.width)}×${Math.round(box.height)}`);
        };
        card.shadowRoot!.querySelectorAll("button").forEach(check);
        card.shadowRoot!.querySelectorAll("dd-tile").forEach((item) => check(item.shadowRoot!.querySelector("button")!));
        return out;
      });
      expect(small, `šířka ${width}`).toEqual([]);
    }
    for (const theme of ["dark", "light"] as const) {
      await open(page, "evening", theme);
      await update(page, { "input_number.pracovna_ac_pracovna_filtr_hodiny": { state: "305" } });
      // The card has no heading of its own: the name of the dashboard is the heading of the page in Home Assistant.
      expect(await axeViolations(page, ["page-has-heading-one"]), theme).toEqual([]);
    }
  });
});
