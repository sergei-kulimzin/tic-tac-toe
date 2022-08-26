import { CellType } from '../types';

const removeUndefinedItems = (cell: CellType, partBefore: CellType[], partAfter: CellType[]) => {
  return [...partBefore, cell, ...partAfter].reduce((result, cell): CellType[] => {
    if (cell !== undefined) {
      return [...result, cell];
    }
    return result;
  }, [] as CellType[]);
};

const getRowPart = (amountToWin: number, cell: CellType, board: Array<CellType[]>) => {
  const { x, y } = cell.coordinates;

  const rowPartBeforeCell: CellType[] = [];
  const rowPartAfterCell: CellType[] = [];

  for (let i = 1; i <= amountToWin - 1; i++) {
    rowPartBeforeCell.push(board[y][x - i]);
    rowPartAfterCell.push(board[y][x + i]);
  }

  return removeUndefinedItems(cell, rowPartBeforeCell, rowPartAfterCell);
};

const getColumnPart = (amountToWin: number, cell: CellType, board: Array<CellType[]>) => {
  const { x, y } = cell.coordinates;

  const columnPartBeforeCell: CellType[] = [];
  const columnPartAfterCell: CellType[] = [];

  for (let i = 1; i <= amountToWin - 1; i++) {
    if (board[y - i]) {
      columnPartBeforeCell.push(board[y - i][x]);
    }
    if (board[y + i]) {
      columnPartAfterCell.push(board[y + i][x]);
    }
  }

  return removeUndefinedItems(cell, columnPartBeforeCell, columnPartAfterCell);
};

const getFirstDiagonalPart = (amountToWin: number, cell: CellType, board: Array<CellType[]>) => {
  const { x, y } = cell.coordinates;

  const diagonalPartBeforeCell: CellType[] = [];
  const diagonalPartAfterCell: CellType[] = [];

  for (let i = 1; i <= amountToWin - 1; i++) {
    if (board[y - i]) {
      diagonalPartBeforeCell.push(board[y - i][x - i]);
    }
    if (board[y + i]) {
      diagonalPartAfterCell.push(board[y + i][x + i]);
    }
  }

  return removeUndefinedItems(cell, diagonalPartBeforeCell, diagonalPartAfterCell);
};

const getSecondDiagonalPart = (amountToWin: number, cell: CellType, board: Array<CellType[]>) => {
  const { x, y } = cell.coordinates;

  const diagonalPartBeforeCell: CellType[] = [];
  const diagonalPartAfterCell: CellType[] = [];

  for (let i = 1; i <= amountToWin - 1; i++) {
    if (board[y + i]) {
      diagonalPartBeforeCell.push(board[y + i][x - i]);
    }
    if (board[y - i]) {
      diagonalPartAfterCell.push(board[y - i][x + i]);
    }
  }

  return removeUndefinedItems(cell, diagonalPartBeforeCell, diagonalPartAfterCell);
};

export const calculateWinner = (amountToWin: number, cell: CellType, board: Array<CellType[]>): boolean => {
  const rowPart = getRowPart(amountToWin, cell, board);
  const columPart = getColumnPart(amountToWin, cell, board);
  const firstDiagonalPart = getFirstDiagonalPart(amountToWin, cell, board);
  const secondDiagonalPart = getSecondDiagonalPart(amountToWin, cell, board);

  return [rowPart, columPart, firstDiagonalPart, secondDiagonalPart].some((part) => {
    return amountToWin === part.filter((partCell) => partCell.value === cell.value).length;
  });
};
