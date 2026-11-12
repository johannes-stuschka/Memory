import { clearSettings } from "../shared/storage";

/** Startseite, relativ zu `pages/game.html` */
const HOME_URL = "../index.html";

/**
 * Verbindet den „Exit game“-Button mit dem Pop-up:
 * „Exit game“ öffnet es, „Back to game“ schließt es,
 * und Beenden löscht die Einstellungen und führt zur Startseite.
 */
export function initExitPopUp() {
  const exitButton = document.querySelector(".exit-button");
  const quitPopUp = document.querySelector<HTMLDialogElement>("#quit-popup");
  const keepPlaying = document.querySelector(".popup__button--primary");
  const exitGame = document.querySelector(".popup__button--secondary");
  if (exitButton && quitPopUp && keepPlaying && exitGame) {
    exitButton.addEventListener("click", () => quitPopUp.showModal());
    keepPlaying.addEventListener("click", () => quitPopUp.close());
    exitGame.addEventListener("click", () => {
      clearSettings();
      window.location.href = HOME_URL;
    });
  }
}
