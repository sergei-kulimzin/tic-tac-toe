import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '..';
import { CellValue } from '../../const';
import { CellData, FormInputs, Row } from '../../types';
import { checkIsWinCellsAmountReached } from '../../utils/checkIsWinCellsAmountReached';
import { checkIsBoardHaveEmptyCells } from '../../utils/checkIsBoardHaveEmptyCells';
import { createGameBoardBySize } from '../../utils/createGameBoardBySize';

type GameState = {
  gameBoardSize: number;
  gameBoard: Row[];
  players: string[];
  winCellsAmount: number;
  isGameStarted: boolean;
  isFirstPlayerStep: boolean;
  choosenCell: CellData | null;
};

const initialState: GameState = {
  gameBoardSize: 0,
  gameBoard: [],
  players: [],
  winCellsAmount: 0,
  isGameStarted: false,
  isFirstPlayerStep: false,
  choosenCell: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startNewgame: (state, { payload }: PayloadAction<FormInputs>) => {
      state.gameBoardSize = payload.gameBoardSize;
      state.gameBoard = createGameBoardBySize(payload.gameBoardSize);
      state.players = [payload.player1, payload.player2];
      state.winCellsAmount = payload.winCellsAmount;
    },
    chooseCell: (state, { payload }: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = payload;
      const { gameBoard, isFirstPlayerStep } = state;

      if (gameBoard[y][x].value === CellValue.IDLE) {
        const nextBoard: Row[] = gameBoard.map((row) => {
          return row.map((cell) => {
            if (cell.coordinates.x === x && cell.coordinates.y === y) {
              return {
                ...cell,
                coordinates: { ...cell.coordinates },
                value: isFirstPlayerStep ? CellValue.ZERO : CellValue.X,
              };
            }
            return { ...cell, coordinates: { ...cell.coordinates } };
          });
        });
        state.gameBoard = nextBoard;
        state.isFirstPlayerStep = !isFirstPlayerStep;
        state.choosenCell = nextBoard[y][x];
        if (!state.isGameStarted) {
          state.isGameStarted = true;
        }
      }
    },
    repeatGame: (state) => {
      state.gameBoard = createGameBoardBySize(state.gameBoardSize);
      state.isGameStarted = false;
      state.isFirstPlayerStep = false;
      state.choosenCell = null;
    },
  },
});

export const { startNewgame, chooseCell, repeatGame } = gameSlice.actions;
export default gameSlice.reducer;

export const selectGameBoard = (state: AppState) => state.game.gameBoard;
export const selectIsBoardHaveEmptyCells = (state: AppState) => checkIsBoardHaveEmptyCells(state.game.gameBoard);
export const selectWinner = (state: AppState) => {
  const { winCellsAmount, gameBoard, choosenCell, isFirstPlayerStep, players } = state.game;

  if (choosenCell && checkIsWinCellsAmountReached(winCellsAmount, gameBoard, choosenCell)) {
    return isFirstPlayerStep ? players[0] : players[1];
  }

  return null;
};
