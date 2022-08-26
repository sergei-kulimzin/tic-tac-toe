import { CellValue } from '../const';
import { CellType } from '../types';

export const checkIsBoardHaveEmptyCells = (board: Array<CellType[]>): boolean => {
  return board.flat().some((cell) => cell.value === CellValue.Idle);
};
