import type { Card } from "./cards";

export function renderBoard(cards: Card[]) {
  const boardRef = document.getElementById("field");
  if (boardRef) {
    boardRef.innerHTML = "";
    for (const card of cards) {
      boardRef.innerHTML += getCardTemplate(card.pairId, card.image);
    }
  }
}

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

export function handleCardClick(card: HTMLButtonElement) {
  card.classList.toggle("is-flipped");
}
