import type { Theme } from "../shared/types";

/**
 * Eine Memory-Karte.
 * @remarks Zwei Karten mit derselben `pairId` bilden ein Paar.
 */
export type Card = {
  /** Nummer des Paares, zu dem die Karte gehört */
  pairId: number;
  /** URL des Motivs auf der Vorderseite */
  image: string;
};

/**
 * Alle Kartenmotive als URL, damit Vite sie in den Build übernimmt.
 * Schlüssel: `../../assets/game/<theme>/cards/<nummer>.svg`
 */
const CARD_IMAGES = import.meta.glob<string>("../../assets/game/*/cards/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

/**
 * Erstellt eine einzelne Karte.
 * @param pairId - Nummer des Paares
 * @param image - URL des Motivs
 * @returns Die neue Karte
 */
function createCard(pairId: number, image: string): Card {
  return {
    pairId,
    image,
  };
}

/**
 * Sucht die URL eines Kartenmotivs.
 * @param theme - Theme, aus dessen Ordner das Motiv kommt
 * @param number - Nummer des Motivs (1, 2, 3 …)
 * @returns Die URL des Motivs
 */
function getCardImage(theme: Theme, number: number): string {
  return CARD_IMAGES[`../../assets/game/${theme}/cards/${String(number).padStart(2, "0")}.svg`];
}

/**
 * Erstellt ein gemischtes Kartendeck mit je zwei Karten pro Motiv.
 * @param pairCount - Anzahl der Paare (8, 12 oder 18)
 * @param theme - Theme, bestimmt die Motive
 * @returns Das gemischte Deck mit `pairCount * 2` Karten
 * @example
 * ```ts
 * const deck = createDeck(8, "gaming"); // 16 Karten
 * ```
 */
export function createDeck(pairCount: number, theme: Theme): Card[] {
  const deck: Card[] = [];
  for (let i = 1; i <= pairCount; i++) {
    const image = getCardImage(theme, i);
    deck.push(createCard(i, image), createCard(i, image));
  }
  shuffle(deck);
  return deck;
}

/**
 * Mischt die Karten zufällig (Fisher-Yates).
 * @remarks Verändert das übergebene Array direkt.
 * @param arr - Die zu mischenden Karten
 */
function shuffle(arr: Card[]) {
  let i = arr.length;
  let j: number;
  let temp: Card;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}
