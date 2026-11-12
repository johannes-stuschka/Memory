import "../../scss/main.scss";
import { getBoardSize, getStartPlayer, getTheme } from "../shared/storage";
import { createDeck } from "../game/cards";
import { applyTheme, initBoardClicks, renderBoard, setBoardSize } from "../game/board";
import { setStartPlayer } from "../game/players";
import { initExitPopUp } from "../game/exit-popup";

const theme = getTheme();
const boardSize = getBoardSize();

applyTheme(theme);
setBoardSize(boardSize);
renderBoard(createDeck(boardSize / 2, theme));
initBoardClicks();
initExitPopUp();
setStartPlayer(getStartPlayer());
