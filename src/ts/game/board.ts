import type { BoardSize, Theme } from "../shared/types";
import type { Card } from "./cards";
import { countPlayerScore, getCurrentPlayer, switchPlayer } from "./players";
import { showGameOver } from "./results";

/** Wie lange zwei falsche Karten offen bleiben */
const FLIP_BACK_DELAY_MS = 1500;

/** Wie lange nach dem letzten Paar der Game-over-Bildschirm auf sich warten lässt */
const GAME_OVER_DELAY_MS = 1500;

/** Die aktuell aufgedeckten, noch nicht gefundenen Karten (maximal zwei) */
let flippedCards: HTMLButtonElement[] = [];

/**
 * Aktiviert ein Theme über das `data-theme`-Attribut am `<body>`.
 * @param theme - Das gewählte Theme
 */
export function applyTheme(theme: Theme) {
  document.body.dataset.theme = theme;
}

/**
 * Setzt die Größen-Klasse (`game--16`, `game--24` oder `game--36`) auf das Spielfeld,
 * damit die passenden Layout-Werte aus dem Theme greifen.
 * @param size - Anzahl der Karten
 */
export function setBoardSize(size: BoardSize) {
  const boardRef = document.querySelector<HTMLElement>(".game");
  if (boardRef) {
    boardRef.classList.add(`game--${size}`);
  }
}

/**
 * Zeichnet alle Karten ins Spielfeld. Vorhandene Karten werden vorher entfernt.
 * @param cards - Das Kartendeck, z. B. aus `createDeck`
 */
export function renderBoard(cards: Card[]) {
  const boardRef = document.getElementById("field");
  if (boardRef) {
    boardRef.innerHTML = "";
    for (const card of cards) {
      boardRef.innerHTML += getCardTemplate(card.pairId, card.image);
    }
  }
}

/**
 * Registriert einen Klick-Listener auf dem Spielfeld (Event Delegation)
 * und leitet Klicks auf eine Karte an {@link handleCardClick} weiter.
 */
export function initBoardClicks() {
  const fieldRef = document.getElementById("field");
  if (fieldRef) {
    fieldRef.addEventListener("click", (e) => {
      const card = (e.target as HTMLElement).closest<HTMLButtonElement>(".card");
      if (card) {
        handleCardClick(card);
      }
    });
  }
}

/**
 * Erzeugt das HTML für eine Karte.
 * @param cardId - Nummer des Paares, landet in `data-pair-id`
 * @param cardImagePath - URL des Motivs
 * @returns Das HTML der Karte als String
 */
function getCardTemplate(cardId: number, cardImagePath: string): string {
  return `
    <button class="card" data-pair-id="${cardId}" type="button">
      <div class="card__inner">
        <div class="card__face"></div>
        <div class="card__face card__face--back">
          <img class="card__image" src="${cardImagePath}" alt="" />
        </div>
      </div>
    </button>
    `;
}

/**
 * Deckt eine Karte auf, solange noch keine zwei Karten offen liegen.
 * Bereits offene oder gefundene Karten werden ignoriert.
 * @param card - Die angeklickte Karte
 */
function handleCardClick(card: HTMLButtonElement) {
  if (flippedCards.length >= 2) return;
  if (flippedCards.includes(card)) return;
  if (card.classList.contains("is-matched")) return;
  card.classList.toggle("is-flipped");
  flippedCards.push(card);
  checkCards();
}

/**
 * Prüft zwei aufgedeckte Karten.
 * Bei einem Paar bekommt der aktuelle Spieler einen Punkt und darf weiterspielen,
 * sonst werden die Karten nach {@link FLIP_BACK_DELAY_MS} wieder umgedreht und der Spieler wechselt.
 */
function checkCards() {
  if (flippedCards.length !== 2) return;
  if (flippedCards[0].dataset.pairId === flippedCards[1].dataset.pairId) {
    for (const card of flippedCards) {
      card.classList.add("is-matched");
    }
    countPlayerScore(getCurrentPlayer());
    flippedCards = [];
    if (isGameOver()) {
      setTimeout(showGameOver, GAME_OVER_DELAY_MS);
    }
  } else {
    setTimeout(closeCards, FLIP_BACK_DELAY_MS);
    setTimeout(switchPlayer, FLIP_BACK_DELAY_MS);
  }
}

/**
 * Dreht alle aufgedeckten Karten wieder um und leert {@link flippedCards}.
 */
function closeCards() {
  for (const card of flippedCards) {
    card.classList.remove("is-flipped");
  }
  flippedCards = [];
}

/**
 * Prüft, ob alle Paare gefunden wurden.
 * @returns `true`, wenn jede Karte gefunden ist
 */
function isGameOver(): boolean {
  const allCards = document.querySelectorAll(".card");
  const allPairs = document.querySelectorAll(".is-matched");
  return allCards.length === allPairs.length;
}
