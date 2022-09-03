import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './startGamePage.module.css';

import { useAppDispatch } from '../../hooks/useStore';
import { startNewgame } from '../../store/slices/gameSlice';
import { FormInputs } from '../../types';

function StartGamePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, getValues } = useForm<FormInputs>({
    mode: 'onTouched',
    defaultValues: {
      gameBoardSize: 3,
      winCellsAmount: 3,
    },
  });

  const submitHandler: SubmitHandler<FormInputs> = (formData) => {
    dispatch(startNewgame(formData));
    navigate('/game');
  };

  return (
    <div className={styles.startGamePage}>
      <div className='container'>
        <h1 className={styles.title}>Крестики - Нолики</h1>
        <form className={styles.playersForm} onSubmit={handleSubmit(submitHandler)}>
          <input
            className={styles.inputPlayer}
            type='text'
            placeholder='Имя первого игрока..'
            {...register('player1', {
              validate: {
                isNotEmpty: (value) => value.trim() !== '' || 'Введите имя игрока',
                isNotSame: (value) =>
                  value.toLowerCase() !== getValues('player2').toLowerCase() || 'Одинаковые имена игроков',
              },
            })}
          />

          <input
            className={styles.inputPlayer}
            type='text'
            placeholder='Имя второго игрока..'
            {...register('player2', {
              validate: {
                isNotEmpty: (value) => value.trim() !== '' || 'Введите имя игрока',
                isNotSame: (value) =>
                  value.toLowerCase() !== getValues('player1').toLowerCase() || 'Одинаковые имена игроков',
              },
            })}
          />

          <div className={styles.inputNumbers}>
            <label htmlFor='gameBoardSize'>Размер игровой доски</label>
            <input
              className={styles.inputNumber}
              type='number'
              id='gameBoardSize'
              {...register('gameBoardSize', {
                validate: {
                  isNotLessThanThree: (value) => value >= 3 || 'Должно быть не меньше 3',
                  isNotLessThanWinCellsAmount: (value) =>
                    value >= getValues('winCellsAmount') || 'Не должно быть меньше количества ячеек для победы',
                },
              })}
            />

            <label htmlFor='winCellsAmount'>Количество ячеек для победы</label>
            <input
              className={styles.inputNumber}
              type='number'
              id='winCellsAmount'
              {...register('winCellsAmount', {
                validate: {
                  isNotLessThanThree: (value) => value >= 3 || 'Должно быть не меньше 3',
                  isNotGreaterThanGameBoardSize: (value) =>
                    value <= getValues('gameBoardSize') || 'Не должно быть больше размера игровой доски',
                },
              })}
            />
          </div>
          <button className={styles.submitButton} type='submit'>
            НАЧАТЬ ИГРУ
          </button>
        </form>
      </div>
    </div>
  );
}

export default StartGamePage;
