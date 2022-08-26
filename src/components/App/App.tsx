import { Route, Routes } from 'react-router-dom';

import StartGamePage from '../../pages/StartGamePage/StartGamePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import CurrentGamePage from '../../pages/CurrentGamePage/CurrentGamePage';
import ResultPage from '../../pages/ResultPage/ResultPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<StartGamePage />} />
      <Route path='/game' element={<CurrentGamePage />} />
      <Route path='/result' element={<ResultPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
