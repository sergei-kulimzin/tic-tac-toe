import { CellValue } from '../const';
import { CellData, Row } from '../types';

type Ranges = {
  [key: string]: Row;
};

export const checkIsWinCellsAmountReached = (
  winCellsAmount: number,
  gameBoard: Row[],
  choosenCell: CellData
): boolean => {
  if (choosenCell.value === CellValue.IDLE) {
    return false;
  }

  const { x, y } = choosenCell.coordinates;

  const offset = winCellsAmount - 1;

  const ranges: Ranges = {
    row: [],
    column: [],
    mainDiagonal: [],
    secondaryDiagonal: [],
  };

  for (let i = x - offset; i <= x + offset; i++) {
    if (gameBoard[y][i]) {
      ranges.row.push(gameBoard[y][i]);
    }
  }

  for (let i = y - offset; i <= y + offset; i++) {
    if (gameBoard[i]) {
      ranges.column.push(gameBoard[i][x]);
    }
  }

  for (let i = x - offset, j = y - offset; i <= x + offset && j <= y + offset; i++, j++) {
    if (gameBoard[j] && gameBoard[j][i]) {
      ranges.mainDiagonal.push(gameBoard[j][i]);
    }
  }

  for (let i = x - offset, j = y + offset; i <= x + offset && j >= y - offset; i++, j--) {
    if (gameBoard[j] && gameBoard[j][i]) {
      ranges.secondaryDiagonal.push(gameBoard[j][i]);
    }
  }

  for (let key in ranges) {
    let winCellsCounter = 0;
    let maxSequence = 0;

    ranges[key].forEach((cell) => {
      if (cell.value === choosenCell.value) {
        maxSequence++;
        winCellsCounter < maxSequence && (winCellsCounter = maxSequence);
      } else {
        maxSequence = 0;
      }
    });

    if (winCellsCounter >= winCellsAmount) {
      return true;
    }
  }

  return false;
};
