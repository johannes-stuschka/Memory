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
      for (const card of flippedCards) {
        card.classList.add("is-matched");
      }
      countPlayerScore(currentPlayer);
      flippedCards = [];
      if (isGameOver()) {
        setTimeout(showGameOver, 1500);
      }
    } else {
      setTimeout(closeCards, 1500);
      setTimeout(switchPlayer, 1500);
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
  updateCurrentPlayer(currentPlayer);
}

function countPlayerScore(player: "blue" | "orange") {
  const playerScore = document.querySelectorAll(`.score__player--${player} .score__value`);
  scores[player] += 1;
  for (const card of playerScore) {
    card.textContent = String(scores[player]);
  }
}

function updateCurrentPlayer(player: "blue" | "orange") {
  const playerSymbol = document.querySelector(".current-player");
  if (playerSymbol) {
    playerSymbol.classList.toggle("current-player--orange", player === "orange");
  }
}

function isGameOver(): boolean {
  const allCards = document.querySelectorAll(".card");
  const allPairs = document.querySelectorAll(".is-matched");
  if (allCards.length === allPairs.length) {
    return true;
  } else {
    return false;
  }
}

function showGameOver() {
  const endScreenRef = document.querySelector(".result--game-over");
  if (endScreenRef) {
    endScreenRef.removeAttribute("hidden");
    setTimeout(showResults, 3000);
  }
}

function showResults() {
  if (scores["blue"] > scores["orange"]) {
    showWinner("blue");
  } else if (scores["orange"] > scores["blue"]) {
    showWinner("orange");
  } else {
    console.log("Draw");
    showDraw();
  }
}

function showDraw() {
  const endScreenRef = document.querySelector(".result--draw");
  if (endScreenRef) {
    endScreenRef.removeAttribute("hidden");
  }
}

function showWinner(player: "blue" | "orange") {
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
