import type { Player } from "../shared/types";
import { clearSettings } from "../shared/storage";
import { getScores } from "./players";

/** Wie lange der Game-over-Bildschirm steht, bevor das Ergebnis kommt */
const RESULT_DELAY_MS = 3000;

/**
 * Zeigt den Game-over-Bildschirm, nach {@link RESULT_DELAY_MS} das Ergebnis,
 * und löscht die gespeicherten Einstellungen.
 */
export function showGameOver() {
  const endScreenRef = document.querySelector(".result--game-over");
  if (endScreenRef) {
    endScreenRef.removeAttribute("hidden");
    setTimeout(showResults, RESULT_DELAY_MS);
    clearSettings();
  }
}

/**
 * Vergleicht die Punktestände und zeigt den Gewinner oder ein Unentschieden.
 */
function showResults() {
  const scores = getScores();
  if (scores.blue > scores.orange) {
    showWinner("blue");
  } else if (scores.orange > scores.blue) {
    showWinner("orange");
  } else {
    showDraw();
  }
}

/**
 * Zeigt den Bildschirm für ein Unentschieden.
 */
function showDraw() {
  const endScreenRef = document.querySelector(".result--draw");
  if (endScreenRef) {
    endScreenRef.removeAttribute("hidden");
  }
}

/**
 * Zeigt den Gewinner-Bildschirm in der Farbe des Gewinners.
 * @param player - Der Spieler mit den meisten Punkten
 */
function showWinner(player: Player) {
  const winner = document.querySelector(".result--winner");
  if (winner) {
    const winnerNameRef = winner.querySelector(".result__winner-name");
    if (winnerNameRef) {
      winnerNameRef.textContent = `${player} Player`;
    }
    winner.classList.add(`result--${player}`);
    winner.removeAttribute("hidden");
  }
}
