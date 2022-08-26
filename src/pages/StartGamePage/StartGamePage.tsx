import { ChangeEventHandler, FocusEventHandler, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './startGamePage.module.css';

import { useAppDispatch } from '../../hooks/useStore';
import { startCurrentGame } from '../../store/slices/currentGameSlice';
import { createBoardBySize } from '../../utils/createBoardBySize';

function StartGamePage(): JSX.Element {
  const [formData, setFormData] = useState({ player1: '', player2: '', boardSize: 3, amountToWin: 3 });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { target } = event;

    setFormData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleBlurInput: FocusEventHandler<HTMLInputElement> = (event) => {
    const { target } = event;

    if (target.type === 'number' && +target.value < 3) {
      setFormData((prevState) => ({ ...prevState, [target.name]: 3 }));
    }

    if (target.name === 'boardSize' && +target.value < +formData.amountToWin) {
      setFormData((prevState) => ({ ...prevState, [target.name]: prevState.amountToWin }));
    }
  };

  const handleStartCurrentGame: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const players = [formData.player1, formData.player2];
    const board = createBoardBySize(+formData.boardSize);
    dispatch(startCurrentGame({ players, board, amountToWin: +formData.amountToWin }));
    event.currentTarget.reset();
    navigate('/game');
  };

  return (
    <div className={styles.startGamePage}>
      <div className='container'>
        <h1 className={styles.title}>НОВАЯ ИГРА</h1>
        <form className={styles.playersForm} onSubmit={handleStartCurrentGame}>
          <input
            className={styles.inputPlayer}
            type='text'
            name='player1'
            id='inputPlayer1'
            placeholder='Имя первого игрока..'
            required
            onChange={handleChangeInput}
            value={formData.player1}
          />
          <input
            className={styles.inputPlayer}
            type='text'
            name='player2'
            id='inputPlayer2'
            placeholder='Имя второго игрока..'
            required
            onChange={handleChangeInput}
            value={formData.player2}
          />
          <div className={styles.inputNumbers}>
            <label htmlFor=''>Размер поля</label>
            <input
              className={styles.inputNumber}
              type='number'
              name='boardSize'
              required
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
              value={formData.boardSize}
            />
            <label htmlFor=''>Количество ячеек для победы</label>
            <input
              className={styles.inputNumber}
              type='number'
              name='amountToWin'
              required
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
              value={formData.amountToWin}
            />
          </div>
          <button className={styles.submitButton} type='submit'>
            НАЧАТЬ
          </button>
        </form>
      </div>
    </div>
  );
}

export default StartGamePage;
