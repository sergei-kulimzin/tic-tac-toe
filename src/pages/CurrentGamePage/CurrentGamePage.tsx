import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useStore';
import { selectGameBoard, selectIsBoardHaveEmptyCells, selectWinner } from '../../store/slices/gameSlice';

import GameBoard from '../../components/GameBoard/GameBoard';

function CurrentGamePage(): JSX.Element {
  const gameBoard = useAppSelector(selectGameBoard);
  const winner = useAppSelector(selectWinner);
  const isBoardHaveEmptyCells = useAppSelector(selectIsBoardHaveEmptyCells);

  if (winner || !isBoardHaveEmptyCells) {
    return <Navigate to='/result' />;
  }

  return <GameBoard gameBoard={gameBoard} />;
}

export default CurrentGamePage;
