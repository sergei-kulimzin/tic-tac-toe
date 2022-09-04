import { useNavigate } from 'react-router-dom';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import classnames from 'classnames';

import styles from './startGamePage.module.css';

import { useAppDispatch } from '../../hooks/useStore';
import { startNewgame } from '../../store/slices/gameSlice';
import { FormInputs } from '../../types';

function StartGamePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>({
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

  const inputWrapperClassNames = (error: FieldError | undefined) =>
    classnames({
      [styles.inputWrapper]: true,
      [styles.inputWrapperError]: error,
    });

  return (
    <div className='container'>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={inputWrapperClassNames(errors.player1)}>
          <input
            className={styles.textInput}
            type='text'
            id='player1'
            {...register('player1', {
              validate: {
                isNotEmpty: (value) => value.trim() !== '' || 'поле не должно быть пустым',
                isNotSame: (value) =>
                  value.toLowerCase() !== getValues('player2').toLowerCase() || 'одинаковые имена игроков',
              },
            })}
          />
          <label className={styles.label} htmlFor='player1'>
            Имя первого игрока
          </label>
          {errors.player1 && <span className={styles.errorMessage}>{errors.player1.message}</span>}
        </div>

        <div className={inputWrapperClassNames(errors.player2)}>
          <input
            className={styles.inputPlayer}
            type='text'
            id='player2'
            {...register('player2', {
              validate: {
                isNotEmpty: (value) => value.trim() !== '' || 'поле не должно быть пустым',
                isNotSame: (value) =>
                  value.toLowerCase() !== getValues('player1').toLowerCase() || 'одинаковые имена игроков',
              },
            })}
          />
          <label className={styles.label} htmlFor='player2'>
            Имя второго игрока
          </label>
          {errors.player2 && <span className={styles.errorMessage}>{errors.player2.message}</span>}
        </div>

        <div className={inputWrapperClassNames(errors.gameBoardSize)}>
          <input
            className={styles.inputNumber}
            type='number'
            id='gameBoardSize'
            inputMode='numeric'
            {...register('gameBoardSize', {
              validate: {
                isNotLessThanThree: (value) => +value >= 3 || 'значение не может быть меньше 3',
                isNotLessThanWinCellsAmount: (value) =>
                  +value >= getValues('winCellsAmount') || 'значение не может быть меньше количества ячеек для победы',
              },
            })}
          />
          <label className={styles.label} htmlFor='gameBoardSize'>
            Размер игровой доски
          </label>
          {errors.gameBoardSize && <span className={styles.errorMessage}>{errors.gameBoardSize.message}</span>}
        </div>

        <div className={inputWrapperClassNames(errors.winCellsAmount)}>
          <input
            className={styles.inputNumber}
            type='number'
            id='winCellsAmount'
            inputMode='numeric'
            {...register('winCellsAmount', {
              validate: {
                isNotLessThanThree: (value) => +value >= 3 || 'значение не может быть меньше 3',
                isNotGreaterThanGameBoardSize: (value) =>
                  +value <= getValues('gameBoardSize') || 'значение не может быть больше размера игровой доски',
              },
            })}
          />
          <label className={styles.label} htmlFor='winCellsAmount'>
            Ячеек для победы
          </label>
          {errors.winCellsAmount && <span className={styles.errorMessage}>{errors.winCellsAmount.message}</span>}
        </div>

        <button className={styles.button} type='submit'>
          НАЧАТЬ ИГРУ
        </button>
      </form>
    </div>
  );
}

export default StartGamePage;
