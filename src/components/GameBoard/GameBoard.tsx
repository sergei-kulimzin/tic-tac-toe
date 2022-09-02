import styles from './gameBoard.module.css';

import { Row } from '../../types';
import { useAppDispatch } from '../../hooks/useStore';
import { chooseCell } from '../../store/slices/currentGameSlice';

import Cell from '../Cell/Cell';

type GameBoardProps = {
  board: Row[];
};

function GameBoard(props: GameBoardProps): JSX.Element {
  const { board } = props;
  const dispatch = useAppDispatch();

  const handleChooseCell = (coordinates: { x: number; y: number }) => {
    dispatch(chooseCell(coordinates));
  };

  return (
    <div className={styles.gameBoard}>
      {board.map((row) => (
        <div className={styles.row} key={row[0].coordinates.y}>
          {row.map((cell) => {
            const key = `${cell.coordinates.x}${cell.coordinates.y}`;
            return <Cell key={key} onClickCell={handleChooseCell} cell={cell} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
