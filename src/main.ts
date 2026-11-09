import "./scss/main.scss";
import { initSettings } from "./ts/settings";
import { createDeck } from "./ts/cards";
import { renderBoard } from "./ts/game";
import { handleCardClick } from "./ts/game";

init();
initSettings();
renderBoard(createDeck(8, "da-projects"));

function init() {
  const fieldRef = document.getElementById("field");
  if (fieldRef) {
    fieldRef.addEventListener("click", (e) => {
      const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
      if (card) {
        handleCardClick(card);
      }
    });
  }
}
