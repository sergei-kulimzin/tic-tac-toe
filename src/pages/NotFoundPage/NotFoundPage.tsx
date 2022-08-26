import { Link } from 'react-router-dom';

import styles from './notFoundPage.module.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className='container'>
      <div className={styles.notFoundPage}>
        <h1 className={styles.title}>Страница не найдена =(</h1>
        <Link className={styles.link} to='/'>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
