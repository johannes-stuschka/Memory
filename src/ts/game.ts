import type { Card } from "./cards";

let flippedCards: HTMLButtonElement[] = [];
let currentPlayer: "blue" | "orange" = "blue";
let scores = { blue: 0, orange: 0 };

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
      countPlayerScore(currentPlayer);
      flippedCards = [];
    } else {
      setTimeout(closeCards, 1500);
      switchPlayer();
    }
  }
}

function closeCards() {
  for (const card of flippedCards) {
    card.classList.remove("is-flipped");
  }
  flippedCards = [];
}

function switchPlayer() {
  if (currentPlayer === "blue") {
    currentPlayer = "orange";
  } else {
    currentPlayer = "blue";
  }
  console.log(`It's ${currentPlayer}'s turn!`);
  updateCurrentPlayer(currentPlayer);
}

function countPlayerScore(player: "blue" | "orange") {
  const playerScore = document.querySelector(`.score__player--${player} .score__value`);
  console.log(playerScore);
  scores[player] += 1;
  if (playerScore) {
    playerScore.textContent = String(scores[player]);
  }
}

function updateCurrentPlayer(player: "blue" | "orange") {
  const playerSymbol = document.querySelector(".current-player");
  if (playerSymbol) {
    playerSymbol.classList.toggle("current-player--orange", player === "orange");
  }
}

function isGamerOver(): boolean {
  let card = flippedCards.length 
  let pairs =
  return true
}
