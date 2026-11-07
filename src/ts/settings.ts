export function initSettings() {
  changePreview();
  changePlayer();
  changeBoard();
}

const form = document.querySelector<HTMLFormElement>(".settings__options");
const preview = document.querySelector<HTMLImageElement>(".settings__theme-visual");
const theme = document.querySelector<HTMLSpanElement>(".game-theme");
const color = document.querySelector<HTMLSpanElement>(".player-color");
const size = document.querySelector<HTMLSpanElement>(".board-size");
const button = document.querySelector<HTMLAnchorElement>(".small-button");
const summary = document.querySelector<HTMLDivElement>(".settings__summary");

function changePreview() {
  form?.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;

    if (input.value === "code-vibes") {
      preview!.src = "/src/assets/svg/Theme-Visual.svg";
      theme!.textContent = "Code Vibes Theme";
    }
    if (input.value === "gaming") {
      preview!.src = "/src/assets/svg/Theme-Visual-4.svg";
      theme!.textContent = "Gaming Theme";
    }
    if (input.value === "da-projects") {
      preview!.src = "/src/assets/svg/Theme-Visual-2.svg";
      theme!.textContent = "DA Projects Theme";
    }
    if (input.value === "foods") {
      preview!.src = "/src/assets/svg/Theme-Visual-3.svg";
      theme!.textContent = "Foods Theme";
    }
    activateButton();
  });
}

function changePlayer() {
  form?.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;

    if (input.value == "blue") {
      color!.textContent = "Blue Player";
    }
    if (input.value == "orange") {
      color!.textContent = "Orange Player";
    }
    activateButton();
  });
}

function changeBoard() {
  form?.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;

    if (input.value == "16") {
      size!.textContent = "Board-16 Cards";
    }
    if (input.value == "24") {
      size!.textContent = "Board-24 Cards";
    }
    if (input.value == "36") {
      size!.textContent = "Board-36 Cards";
    }
    activateButton();
  });
}

function activateButton() {
  if (button) {
    const disabled = !color || !size || color.textContent === "Player" || size.textContent === "Board size";
    button.setAttribute("aria-disabled", String(disabled));
    button.tabIndex = disabled ? -1 : 0;
    summary?.classList.toggle("settings__summary--complete", !disabled);
  }
}
