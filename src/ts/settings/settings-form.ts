import type { Theme } from "../shared/types";
import { clearSettings, saveSetting } from "../shared/storage";
import codeVibesVisual from "../../assets/images/theme-visuals/code-vibes.svg";
import gamingVisual from "../../assets/images/theme-visuals/gaming.svg";
import daProjectsVisual from "../../assets/images/theme-visuals/da-projects.svg";
import foodsVisual from "../../assets/images/theme-visuals/foods.svg";

/** Vorschaubild und Name, die je Theme in den Settings angezeigt werden */
const THEME_PREVIEWS: Record<Theme, { image: string; label: string }> = {
  "code-vibes": { image: codeVibesVisual, label: "Code vibes theme" },
  gaming: { image: gamingVisual, label: "Gaming theme" },
  "da-projects": { image: daProjectsVisual, label: "DA Projects theme" },
  foods: { image: foodsVisual, label: "Foods theme" },
};

const form = document.querySelector<HTMLFormElement>(".settings__options");
const preview = document.querySelector<HTMLImageElement>(".settings__theme-visual");
const theme = document.querySelector<HTMLSpanElement>(".game-theme");
const color = document.querySelector<HTMLSpanElement>(".player-color");
const size = document.querySelector<HTMLSpanElement>(".board-size");
const button = document.querySelector<HTMLAnchorElement>(".small-button");
const summary = document.querySelector<HTMLDivElement>(".settings__summary");

/**
 * Startet die Settings-Seite: löscht alte Einstellungen
 * und registriert die Listener für Theme, Spieler und Brettgröße.
 */
export function initSettings() {
  clearSettings();
  changePreview();
  changePlayer();
  changeBoard();
}

/**
 * Reagiert auf die Theme-Auswahl: tauscht das Vorschaubild,
 * zeigt den Theme-Namen in der Zusammenfassung und speichert die Wahl.
 */
function changePreview() {
  form?.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;
    if (input.name !== "theme") return;
    const selected = THEME_PREVIEWS[input.value as Theme];
    preview!.src = selected.image;
    theme!.textContent = selected.label;
    saveSetting("theme", input.value);
    activateButton();
  });
}

/**
 * Reagiert auf die Spielerwahl: zeigt die Farbe in der Zusammenfassung
 * und speichert die Wahl.
 */
function changePlayer() {
  form?.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;
    if (input.name !== "player") return;
    if (input.value === "blue") {
      color!.textContent = "Blue Player";
    }
    if (input.value === "orange") {
      color!.textContent = "Orange Player";
    }
    saveSetting("color", input.value);
    activateButton();
  });
}

/**
 * Reagiert auf die Brettgröße: zeigt sie in der Zusammenfassung
 * und speichert die Wahl.
 */
function changeBoard() {
  form?.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;
    if (input.name !== "board-size") return;
    size!.textContent = `Board-${input.value} Cards`;
    saveSetting("size", input.value);
    activateButton();
  });
}

/**
 * Aktiviert den Start-Button, sobald Spieler und Brettgröße gewählt sind,
 * und schaltet die Zusammenfassung in den fertigen Zustand.
 */
function activateButton() {
  if (button) {
    const disabled = !color || !size || color.textContent === "Player" || size.textContent === "Board size";
    button.setAttribute("aria-disabled", String(disabled));
    button.tabIndex = disabled ? -1 : 0;
    summary?.classList.toggle("settings__summary--complete", !disabled);
  }
}
