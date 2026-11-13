# Dům Dashboard

Lovelace custom card pro Home Assistant: řídicí centrum domu. Nahoře je, co tě potřebuje (nepovedené akce automatiky, slabé baterie, filtr klimatizace k vyčištění, prádlo čeká), pod tím co právě běží a ovládání po skupinách: žaluzie, větrání, topení a klimatizace.

Karta je třetí vedle `ha-klima-dashboard` a `ha-energie-dashboard`; společné prvky (dlaždice, chráněné gesto, jazyky, pravidla konfigurace) jsou v `ha-dashboard-kit`.

## Instalace (HACS)

1. HACS → tři tečky → Vlastní repozitáře → `https://github.com/michal-madle/ha-dum-dashboard`, typ Dashboard.
2. Nainstaluj „Dům Dashboard“ a obnov stránku.
3. Přidej kartu ručně (YAML): `type: custom:ha-dum-dashboard` a konfiguraci podle `examples/dum.yaml`.

## Konfigurace

Úplný příklad se všemi klíči a výchozími hodnotami: [`examples/dum.yaml`](examples/dum.yaml).

- Každý klíč je volitelný. Oddíl bez entit se nezobrazí.
- Chybná hodnota zastaví kartu chybou, která jmenuje klíč. Neznámý klíč uvnitř oddílu je chyba.
- Každé `name` je text, nebo mapa jazyk → text (`{cs: Pračka, en: Washing machine}`).

| Oddíl | Co nastavuje |
|---|---|
| `failed_actions`, `clear_failed_script` | senzor nesplněných akcí automatiky a skript, který jednu položku smaže |
| `snoozed`, `snooze_script` | senzor odložených věcí a skript „odložit“ (klíč a den návratu); bez nich tlačítko „Odložit“ není |
| `batteries` | čidla s baterií: `low` (binary_sensor, `on` = slabá), volitelně `level` a `type` |
| `filters` | filtry klimatizací: `hours` (input_number, hodiny od čištění) a `threshold` (select, práh v hodinách); úkol ve frontě od prahu, „Hotovo“ hodiny vynuluje |
| `laundry` | prádlo čeká: `name` a `entity` (input_boolean, `on` = čeká); úkol ve frontě s „Odložit“ a „Hotovo“ (vypne ho) |
| `running` | spotřebiče, které se ukážou v „Teď běží“ s dobou běhu |
| `covers` | žaluzie (entita, nebo `name` a `entity`), skript posunu (`entity`, `pos`, `tilt`), předvolby a `last_action` (senzor poslední akce, kdo žaluzií pohnul; detail za šipkou u nadpisu) |
| `ventilation` | větrací režim a větráky |
| `heating`, `cooling` | místnosti topení a klimatizace; `heating.resume` je tlačítko „zpět na plán“; dlaždice otevře společný popup Topení / Klimatizace z kitu |
| `send_delay_seconds` | za kolik sekund po poslední změně popup Topení / Klimatizace změnu odešle (výchozí 2; při zavření hned) |
| `house_mode_entity`, `house_modes.summer` | v létě je Klimatizace nad Topením |
| `guard` | časy chráněného gesta (podržení, dvojité klepnutí, nápověda) |

## Ovládání

Všechno, co na kartě něco přepíná, se spouští podržením nebo dvojitým klepnutím; jedno klepnutí jen ukáže nápovědu. Je to ochrana proti klepnutí omylem při posouvání. Dlaždice se šipkou „›“ jen otevře detail zařízení.

## Vývoj

```bash
npm ci
npm test
```

`npm test` kartu sestaví a pustí testy v prohlížeči (Playwright, Chromium; ve WebKitu v GitHub Actions). `ha-dum-dashboard.js` v kořeni je výsledek sestavení a do repozitáře se commituje kvůli HACS.
