import { CellValue } from './const';

export type CellCoordinates = {
  x: number;
  y: number;
};

export type CellData = {
  coordinates: CellCoordinates;
  value: CellValue;
};

export type Row = CellData[];
