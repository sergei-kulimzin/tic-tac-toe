import { CellValue } from './const';

export type CellType = {
  coordinates: {
    x: number;
    y: number;
  };
  value: CellValue;
};
