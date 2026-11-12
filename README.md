# Memory

Memory-Spiel für zwei Spieler mit vier Themes (Code vibes, Gaming, DA Projects, Foods) und drei Brettgrößen (16, 24, 36 Karten).

Gebaut mit TypeScript, SCSS und Vite.

## Starten

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Der Build landet in `dist/`. Für die Veröffentlichung wird nur der **Inhalt** von `dist/` hochgeladen. Durch `base: "./"` funktioniert er auch in einem Unterordner.

## Ordnerstruktur

```
index.html              Startseite
pages/                  Settings und Spiel
src/
  pages/                ein Einstieg pro Seite (home, settings, game)
  ts/
    game/               Brett, Karten, Spieler, Ergebnis, Exit-Pop-up
    settings/           Formular der Settings-Seite
    shared/             Typen und gespeicherte Einstellungen
  scss/
    abstracts/          Variablen und Mixins
    base/               Schriften, Grundstile, Helfer
    components/         Buttons, Karte, Pop-up, Punktestand
    pages/              Startseite, Settings, Spiel, Ergebnis
    themes/             ein File pro Theme
  assets/
    fonts/
    icons/
    images/
    game/<theme>/       Bilder und Kartenmotive je Theme
```
