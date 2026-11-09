import "./scss/main.scss";
import { initSettings } from "./ts/settings";
import { createDeck } from "./ts/cards";
import { renderBoard } from "./ts/game";

init();
initSettings();
renderBoard();

function init() {
  const fieldRef = document.getElementById("field");
  if (fieldRef) {
    fieldRef.addEventListener("click", (e) => {
      const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
      if (card) {
        card.classList.toggle("is-flipped");
      }
    });
  }
}

console.log(createDeck(18, "code-vibes"));
