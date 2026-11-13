import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { axeViolations } from "ha-dashboard-kit/testing/helpers.mjs";
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
    await expect(rows.nth(0)).toContainText("žaluzie nedostupná");
    await expect(rows.nth(1)).toContainText("Okno Ložnice");
    await expect(rows.nth(1)).toContainText("Baterie 8 % · CR2032");
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

test.describe("ovládání", () => {
  test("pořadí oddílů: Žaluzie, Větrání a potom Topení a Klimatizace podle režimu domu", async ({ page }) => {
    await open(page);
    expect((await headings(page)).slice(2)).toEqual(["Žaluzie", "Větrání", "Topení", "Klimatizace"]);
    await open(page, "summer");
    expect((await headings(page)).slice(2)).toEqual(["Žaluzie", "Větrání", "Klimatizace", "Topení"]);
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

  test("klimatizace: režim a celé stupně, WindFree, nedostupná; „Vypnout vše“ vypne jen běžící; dlaždice otevře detail jedním klepnutím", async ({ page }) => {
    await open(page, "summer");
    const list = await tiles(page, "cooling");
    expect(list.slice(0, 3)).toEqual([
      { name: "Obývák", text: "Chlazení · 22°", state: "on" },
      { name: "Ložnice", text: "WindFree · 24°", state: "on" },
      { name: "Maxík", text: "Nedostupné", state: "off" },
    ]);
    await tile(page, "cooling", "Obývák").click();
    await page.locator('[data-link="alloff"]').dblclick();
    expect(await calls(page)).toEqual([
      { moreInfo: "climate.obyvak_ac_obyvak" },
      { domain: "climate", service: "turn_off", data: { entity_id: ["climate.obyvak_ac_obyvak", "climate.loznice_ac_loznice"] } },
    ]);
    await open(page, "day");
    await expect(page.locator('[data-link="alloff"]')).toHaveCount(0);
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
