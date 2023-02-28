import './App.css';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { createBrowserHistory } from 'history';
import { Routes, BrowserRouter } from 'react-router-dom';
import AppContainer from './container/AppContainer';

function App() {
  const history = createBrowserHistory();
  const initialState = {};
  const store = configureStore(history, initialState)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer></AppContainer>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
