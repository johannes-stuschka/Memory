import "../scss/main.scss";
import { getBoardSize, getStartPlayer, getTheme } from "../ts/shared/storage";
import { createDeck } from "../ts/game/cards";
import { applyTheme, initBoardClicks, renderBoard, setBoardSize } from "../ts/game/board";
import { setStartPlayer } from "../ts/game/players";
import { initExitPopUp } from "../ts/game/exit-popup";

const theme = getTheme();
const boardSize = getBoardSize();

applyTheme(theme);
setBoardSize(boardSize);
renderBoard(createDeck(boardSize / 2, theme));
initBoardClicks();
initExitPopUp();
setStartPlayer(getStartPlayer());
