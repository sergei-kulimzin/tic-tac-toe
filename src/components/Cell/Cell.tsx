import React from 'react';
import classnames from 'classnames';

import styles from './cell.module.css';

import { CellValue } from '../../const';
import { CellData } from '../../types';

type CellProps = {
  onClickCell: (coordinates: { x: number; y: number }) => void;
  cell: CellData;
};

function Cell(props: CellProps): JSX.Element {
  const { onClickCell, cell } = props;

  const handleClickCell = () => {
    onClickCell({ x: cell.coordinates.x, y: cell.coordinates.y });
  };

  const cellClassnames = classnames(styles.cell, {
    [styles.cellX]: cell.value === CellValue.X,
    [styles.cellZero]: cell.value === CellValue.ZERO,
  });

  return <div className={cellClassnames} onClick={handleClickCell}></div>;
}

export default React.memo(Cell, (prevProps, nextProps) => {
  return prevProps.cell.value === nextProps.cell.value;
});
