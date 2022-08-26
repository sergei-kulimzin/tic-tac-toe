import { CellValue } from '../const';
import { CellType } from '../types';

export const createBoardBySize = (size: number): Array<CellType[]> => {
  const matrix: Array<CellType[]> = [];

  for (let i = 0; i < size; i++) {
    const row: CellType[] = [];

    for (let j = 0; j < size; j++) {
      row.push({
        coordinates: {
          y: i,
          x: j,
        },
        value: CellValue.Idle,
      });
    }

    matrix.push(row);
  }

  return matrix;
};
