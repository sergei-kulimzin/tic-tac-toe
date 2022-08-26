import { MouseEventHandler } from 'react';
import { Navigate, Link } from 'react-router-dom';

import styles from './resultPage.module.css';

import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { resumeGame, selectIsBoardHaveEmptyCells, selectWinner } from '../../store/slices/currentGameSlice';

function ResultPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isBoardHaveEmptyCells = useAppSelector(selectIsBoardHaveEmptyCells);
  const winner = useAppSelector(selectWinner);

  const handleClickResumeGame: MouseEventHandler<HTMLAnchorElement> = () => {
    dispatch(resumeGame());
  };

  if (!winner && isBoardHaveEmptyCells) {
    return <Navigate to='/' />;
  }

  return (
    <div className='container'>
      <div className={styles.resultPage}>
        {winner && <h1 className={styles.title}>Игрок: {winner} выиграл!</h1>}
        {!isBoardHaveEmptyCells && <h1 className={styles.title}>Ничья!</h1>}
        <div className='link-wrapper'>
          <Link className={styles.link} to='/game' onClick={handleClickResumeGame}>
            Повторить игру
          </Link>
          <Link className={styles.link} to='/'>
            Новая игра
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
