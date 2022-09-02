import { CellValue } from '../const';
import { Row } from '../types';

export const createBoardBySize = (size: number): Row[] => {
  const matrix: Row[] = [];

  for (let i = 0; i < size; i++) {
    const row: Row = [];

    for (let j = 0; j < size; j++) {
      row.push({
        coordinates: {
          y: i,
          x: j,
        },
        value: CellValue.IDLE,
      });
    }

    matrix.push(row);
  }

  return matrix;
};
