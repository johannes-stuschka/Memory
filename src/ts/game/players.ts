import type { Player } from "../shared/types";

/** Der Spieler, der gerade am Zug ist */
let currentPlayer: Player = "blue";

/** Anzahl der gefundenen Paare pro Spieler */
const scores: Record<Player, number> = { blue: 0, orange: 0 };

/**
 * Gibt den Spieler am Zug zurück.
 * @returns Der aktuelle Spieler
 */
export function getCurrentPlayer(): Player {
  return currentPlayer;
}

/**
 * Gibt die Punktestände zurück.
 * @returns Gefundene Paare pro Spieler
 */
export function getScores(): Readonly<Record<Player, number>> {
  return scores;
}

/**
 * Legt fest, welcher Spieler beginnt, und zeigt ihn an.
 * @param player - Die in den Settings gewählte Farbe
 */
export function setStartPlayer(player: Player) {
  currentPlayer = player;
  updateCurrentPlayer(player);
}

/**
 * Wechselt den Spieler am Zug und aktualisiert die Anzeige.
 */
export function switchPlayer() {
  if (currentPlayer === "blue") {
    currentPlayer = "orange";
  } else {
    currentPlayer = "blue";
  }
  updateCurrentPlayer(currentPlayer);
}

/**
 * Erhöht den Punktestand eines Spielers um eins und zeigt ihn an
 * (im Header und auf dem Game-over-Bildschirm).
 * @param player - Der Spieler, der ein Paar gefunden hat
 */
export function countPlayerScore(player: Player) {
  const playerScore = document.querySelectorAll(`.score__player--${player} .score__value`);
  scores[player] += 1;
  for (const card of playerScore) {
    card.textContent = String(scores[player]);
  }
}

/**
 * Zeigt den Spieler am Zug in der Anzeige „Current player“ an.
 * @param player - Der Spieler, der jetzt am Zug ist
 */
function updateCurrentPlayer(player: Player) {
  const playerSymbol = document.querySelector(".current-player");
  if (playerSymbol) {
    playerSymbol.classList.toggle("current-player--orange", player === "orange");
  }
}
