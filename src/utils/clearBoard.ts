import { CellValue } from '../const';
import { CellType } from '../types';

export const clearBoard = (board: Array<CellType[]>) => {
  return board.map((row) => {
    return row.map((cell) => {
      return {
        ...cell,
        coordinates: {
          ...cell.coordinates,
        },
        value: CellValue.Idle,
      };
    });
  });
};
