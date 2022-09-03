import styles from './gameBoard.module.css';

import { Row } from '../../types';
import { useAppDispatch } from '../../hooks/useStore';
import { chooseCell } from '../../store/slices/gameSlice';

import Cell from '../Cell/Cell';
import { CellValue } from '../../const';

type GameBoardProps = {
  gameBoard: Row[];
};

function GameBoard(props: GameBoardProps): JSX.Element {
  const { gameBoard } = props;
  const dispatch = useAppDispatch();

  const handleChooseCell = (coordinates: { x: number; y: number }) => {
    const { x, y } = coordinates;

    if (gameBoard[y][x].value === CellValue.IDLE) {
      dispatch(chooseCell(coordinates));
    }
  };

  return (
    <div className={styles.gameBoard}>
      {gameBoard.map((row) => (
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
