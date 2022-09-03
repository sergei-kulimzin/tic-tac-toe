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

export type FormInputs = {
  player1: string;
  player2: string;
  gameBoardSize: number;
  winCellsAmount: number;
};
