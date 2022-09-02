import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useStore';
import { selectCurrentBoard, selectIsBoardHaveEmptyCells, selectWinner } from '../../store/slices/currentGameSlice';

import GameBoard from '../../components/GameBoard/GameBoard';

function CurrentGamePage(): JSX.Element {
  const currentBoard = useAppSelector(selectCurrentBoard);
  const winner = useAppSelector(selectWinner);
  const isBoardHaveEmptyCells = useAppSelector(selectIsBoardHaveEmptyCells);

  if (winner || !isBoardHaveEmptyCells) {
    return <Navigate to='/result' />;
  }

  return <GameBoard board={currentBoard} />;
}

export default CurrentGamePage;
