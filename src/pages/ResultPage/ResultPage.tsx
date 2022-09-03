import { MouseEventHandler } from 'react';
import { Navigate, Link } from 'react-router-dom';

import styles from './resultPage.module.css';

import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { repeatGame, selectIsBoardHaveEmptyCells, selectWinner } from '../../store/slices/gameSlice';

function ResultPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isBoardHaveEmptyCells = useAppSelector(selectIsBoardHaveEmptyCells);
  const winner = useAppSelector(selectWinner);

  const handleClickRepeatGame: MouseEventHandler<HTMLAnchorElement> = () => {
    dispatch(repeatGame());
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
          <Link className={styles.link} to='/game' onClick={handleClickRepeatGame}>
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
