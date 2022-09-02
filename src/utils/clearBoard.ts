import { CellValue } from '../const';
import { Row } from '../types';

export const clearBoard = (board: Row[]) => {
  return board.map((row) => {
    return row.map((cell) => {
      return {
        ...cell,
        coordinates: {
          ...cell.coordinates,
        },
        value: CellValue.IDLE,
      };
    });
  });
};
