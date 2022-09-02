import { CellValue } from '../const';
import { Row } from '../types';

export const checkIsBoardHaveEmptyCells = (board: Row[]): boolean => {
  return board.flat().some((cell) => cell.value === CellValue.IDLE);
};
