import type { Card } from "./cards";

let flippedCards: HTMLButtonElement[] = [];

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
  if (flippedCards.length < 2) {
    if (flippedCards.includes(card)) {
      return;
    }
    if (card.classList.contains("is-matched")) {
      return;
    } else {
      if (card) {
        card.classList.toggle("is-flipped");
      }
      flippedCards.push(card);
      checkCards();
    }
  }
}

function checkCards() {
  if (flippedCards.length === 2) {
    if (flippedCards[0].dataset.pairId === flippedCards[1].dataset.pairId) {
      console.log("You got a pair!");
      for (const card of flippedCards) {
        card.classList.add("is-matched");
      }
      flippedCards = [];
    } else {
      console.log("NOPE!");
      setTimeout(closeCards, 1500);
    }
  }
}

function closeCards() {
  for (const card of flippedCards) {
    card.classList.remove("is-flipped");
  }
  flippedCards = [];
}
