import { CellValue } from '../const';
import { Row } from '../types';

export const createGameBoardBySize = (gameBoardSize: number): Row[] => {
  const gameBoard: Row[] = [];

  for (let rowIndex = 0; rowIndex < gameBoardSize; rowIndex++) {
    const row: Row = [];

    for (let cellIndex = 0; cellIndex < gameBoardSize; cellIndex++) {
      row.push({
        coordinates: {
          x: cellIndex,
          y: rowIndex,
        },
        value: CellValue.IDLE,
      });
    }

    gameBoard.push(row);
  }

  return gameBoard;
};
