export type Card = {
  pairId: number;
  image: string;
};

function createCard(pairId: number, image: string): Card {
  return {
    pairId,
    image,
  };
}

export function createDeck(pairCount: number, theme: string): Card[] {
  const deck: Card[] = [];
  for (let i = 1; i <= pairCount; i++) {
    const imagePath = `/src/assets/game/${theme}/cards/${String(i).padStart(2, "0")}.svg`;
    deck.push(createCard(i, imagePath), createCard(i, imagePath));
  }
  shuffle(deck);
  return deck;
}

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
