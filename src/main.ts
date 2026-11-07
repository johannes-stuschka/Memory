import "./scss/main.scss";
import { initSettings } from "./ts/settings";

init();
initSettings();

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
