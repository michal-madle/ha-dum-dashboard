# Dům Dashboard

Lovelace custom card pro Home Assistant: řídicí centrum domu na jedné kartě. Nahoře je, co tě potřebuje, pod tím co právě běží, ovládání po skupinách, zdraví zařízení a deník. Je to **frontendová karta**, ne integrace. Karta sama nic do `configuration.yaml` nepřidává; některé oddíly ale čtou pomocníky, senzory a skripty, které musí v Home Assistantu existovat (viz Konfigurace).

Karta je třetí vedle [Klima Dashboard](https://github.com/michal-madle/ha-klima-dashboard) a [Energie Dashboard](https://github.com/michal-madle/ha-energie-dashboard). Společné prvky (dlaždice, list odspodu, popup Topení / Klimatizace, chráněné gesto, odezva po stisku, jazyky, pravidla konfigurace) jsou v [ha-dashboard-kit](https://github.com/michal-madle/ha-dashboard-kit).

## Co karta ukazuje

| Oddíl | Co |
|---|---|
| Potřebuje tebe | nepovedené akce automatik (u žaluzie „Nedojela do Tma“ a „Zkusit znovu“), slabé baterie, filtr klimatizace, prádlo čeká v pračce nebo sušičce, údržba spotřebičů po počtu cyklů; každý řádek má jednu akci („Hotovo“, „Odložit“ o den, na víkend, o týden, o měsíc) |
| Teď běží | spotřebiče, které nemají vlastní dlaždici, s dobou běhu (restart Home Assistantu ji nenuluje) |
| Žaluzie | předvolby Den, Stín, Tma pro všechny žaluzie; šipka otevře detail s poslední akcí a předvolbami každé místnosti |
| Větrání | Větrací režim a větráky |
| Topení, Klimatizace | dlaždice místností; klepnutí otevře společný popup Topení / Klimatizace; v létě je Klimatizace nahoře |
| Další zařízení | vlastní oddíly z konfigurace (například Světla, Zásuvky, Vysavače); vysavač dvojklepem spustí úklid, při úklidu ho pošle do doku |
| Zdraví | Vyžaduje pozornost, Baterie čidel, Připojení, Systém (například NAS), Aktualizace |
| Co se stalo | deník dneška z deníku Home Assistantu: co se stalo v jedné chvíli je jeden řádek s příčinou a pod ní, co následovalo |
| Pravidla domu | jen pro správce Home Assistantu: všechny automatizace s popisem z jejich konfigurace |

## Ovládání

- Všechno, co na první obrazovce něco přepíná, se spouští **podržením nebo dvojitým klepnutím**; jedno klepnutí jen ukáže nápovědu. Je to ochrana proti klepnutí omylem při posouvání. V otevřeném listu stačí jedno klepnutí.
- Dlaždice se šipkou „›“ otevírá list nebo popup a sama nic nemění.
- Po stisku ovladač **bliká**, dokud Home Assistant nehlásí požadovaný stav; přestane i při chybě, nebo když se 5 s nic nezmění. Se zapnutým omezením pohybu má místo blikání čárkovaný obrys.

## Instalace (HACS)

1. HACS → **⋮** → **Vlastní repozitáře** → `https://github.com/michal-madle/ha-dum-dashboard`, kategorie **Dashboard**.
2. Vyhledej **Dům Dashboard**, zvol **Stáhnout** a obnov stránku.
3. Ověř zdroj `/hacsfiles/ha-dum-dashboard/ha-dum-dashboard.js` typu **JavaScript module** v **Nastavení → Nástěnky → Zdroje** (HACS ho obvykle přidá sám).
4. Na nástěnce **Upravit → Přidat kartu → Ruční** a vlož konfiguraci podle [`examples/dum.yaml`](examples/dum.yaml).

## Konfigurace

Úplný příklad se všemi klíči, výchozími hodnotami a komentáři: [`examples/dum.yaml`](examples/dum.yaml). ID entit v příkladu jsou z Home Assistantu autora; uprav je podle svých.

- Každý klíč je volitelný. Oddíl bez entit se nezobrazí.
- Chybná hodnota zastaví kartu chybou, která jmenuje klíč. Neznámý klíč uvnitř oddílu je chyba.
- Každé `name` je text, nebo mapa jazyk → text (`{cs: Pračka, en: Washing machine}`).

| Klíč | Co nastavuje |
|---|---|
| `language` | `auto` (podle Home Assistantu), `cs`, `en`, `sv` |
| `failed_actions`, `clear_failed_script` | senzor nesplněných akcí automatik (atribut `polozky`) a skript, který jednu položku smaže |
| `snoozed`, `snooze_script` | senzor odložených věcí a skript „odložit“ (pole `klic` a `do`); bez nich tlačítko „Odložit“ není |
| `batteries` | čidla s baterií: `low` (binary_sensor, `on` = slabá), volitelně `level` a `type` |
| `filters` | filtry klimatizací: `hours` (input_number, hodiny od čištění) a `threshold` (práh v hodinách) |
| `laundry` | prádlo čeká: `entity` (input_boolean, `on` = čeká); „Hotovo“ ho vypne |
| `maintenance` | údržba spotřebičů: `task`, `counter` (cykly od údržby) a `every` (po kolika cyklech); „Hotovo“ počítadlo vynuluje |
| `running` | spotřebiče pro „Teď běží“ |
| `covers` | žaluzie, skript posunu (pole `entity`, `pos`, `tilt`), předvolby, tolerance a `last_action` (senzor poslední akce) |
| `ventilation` | Větrací režim (`mode`) a větráky (`fans`) |
| `heating`, `cooling` | místnosti; `heating.resume` je tlačítko „Zpět na plán“ |
| `send_delay_seconds` | za kolik sekund po poslední změně popup Topení / Klimatizace změnu odešle (výchozí 2; při zavření hned) |
| `devices` | další oddíly dlaždic: `name` oddílu a `entities` (light, switch, fan, input_boolean, vacuum) |
| `health` | `battery_low` (výchozí 20 %), `batteries` (senzory v %), `connections` (`on` = připojeno), `system` (hodnota s volitelnou mezí `max`, stav svazku jiný než `normal` nebo binary_sensor `on` je problém), `updates: true` (čekající aktualizace celého Home Assistantu) |
| `house_mode_entity`, `house_modes.summer` | v létě je Klimatizace nad Topením |
| `guard` | časy chráněného gesta (podržení, dvojité klepnutí, nápověda) |

Deník „Co se stalo“ čte deník a záznam Home Assistantu (WebSocket `logbook/get_events` a `history/history_during_period`), Pravidla domu konfiguraci automatizací (`automation/config`). Co už bylo v deníku viděno, si pamatuje každé zařízení samo.

## Vývoj

```bash
npm ci
npm test
```

`npm test` kartu sestaví a pustí 32 testů v prohlížeči (Playwright, Chromium) na zkušební stránce [`tests/harness.html`](tests/harness.html) s náhradními daty Home Assistantu ([`tests/scenarios.js`](tests/scenarios.js)), včetně přístupnosti (axe-core) v tmavém i světlém režimu a šířek 320 až 430 px. `ha-dum-dashboard.js` v kořeni je výsledek sestavení, ručně se neupravuje a commituje se kvůli HACS.

Spec a historie návrhu karty jsou v soukromém repozitáři autora; veřejně je popis konfigurace v příkladu.

## Licence

MIT, viz [LICENSE](LICENSE).
