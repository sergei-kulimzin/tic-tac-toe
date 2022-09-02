import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '..';
import { CellValue } from '../../const';
import { CellData, Row } from '../../types';
import { checkIsWinCellsAmountReached } from '../../utils/checkIsWinCellsAmountReached';
import { checkIsBoardHaveEmptyCells } from '../../utils/checkIsBoardHaveEmptyCells';
import { clearBoard } from '../../utils/clearBoard';

type currentGameState = {
  board: Row[];
  players: string[];
  amountToWin: number;
  isGameStarted: boolean;
  isFirstPlayerStep: boolean;
  choosenCell: CellData;
};

const initialState: currentGameState = {
  board: [],
  players: [],
  amountToWin: 0,
  isGameStarted: false,
  isFirstPlayerStep: false,
  choosenCell: { coordinates: { x: 0, y: 0 }, value: CellValue.IDLE },
};

const currentGameSlice = createSlice({
  name: 'currentGame',
  initialState,
  reducers: {
    startCurrentGame: (state, { payload }: PayloadAction<{ players: string[]; board: Row[]; amountToWin: number }>) => {
      state.players = payload.players;
      state.board = payload.board;
      state.amountToWin = payload.amountToWin;
      state.isGameStarted = false;
      state.isFirstPlayerStep = false;
      state.choosenCell = { coordinates: { x: 0, y: 0 }, value: CellValue.IDLE };
    },
    chooseCell: (state, { payload }: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = payload;
      const { board, isFirstPlayerStep } = state;

      if (board[y][x].value === CellValue.IDLE) {
        const nextBoard: Row[] = board.map((row) => {
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
        state.board = nextBoard;
        state.isFirstPlayerStep = !isFirstPlayerStep;
        state.choosenCell = nextBoard[y][x];
        if (!state.isGameStarted) {
          state.isGameStarted = true;
        }
      }
    },
    resumeGame: (state) => {
      state.isGameStarted = false;
      state.board = clearBoard(state.board);
      state.isFirstPlayerStep = false;
      state.choosenCell = { coordinates: { x: 0, y: 0 }, value: CellValue.IDLE };
    },
  },
});

export const { startCurrentGame, chooseCell, resumeGame } = currentGameSlice.actions;
export default currentGameSlice.reducer;

export const selectCurrentBoard = (state: AppState) => state.currentGame.board;
export const selectAmountToWin = (state: AppState) => state.currentGame.amountToWin;
export const selectCurrentGamePlayers = (state: AppState) => state.currentGame.players;
export const selectIsGameStarted = (state: AppState) => state.currentGame.isGameStarted;
export const selectIsFirstPlayerStep = (state: AppState) => state.currentGame.isFirstPlayerStep;
export const selectChoosenCell = (state: AppState) => state.currentGame.choosenCell;
export const selectIsBoardHaveEmptyCells = (state: AppState) => checkIsBoardHaveEmptyCells(state.currentGame.board);
export const selectWinner = (state: AppState) => {
  const { amountToWin, board, choosenCell, isFirstPlayerStep, players } = state.currentGame;

  if (checkIsWinCellsAmountReached(amountToWin, board, choosenCell)) {
    return isFirstPlayerStep ? players[0] : players[1];
  }

  return null;
};
