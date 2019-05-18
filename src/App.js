import React from 'react';
import './App.css';
import { createStore, compose, applyMiddleware } from 'redux';
import updateState from "./actionCreators/updateState";
import Main from "./components/Main";
import {loadState, localStorageKey, saveState} from "./localStorage";
import reducer from './reducers/reducer';
import { Provider } from 'react-redux';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store = createStore(reducer, loadState(), composeEnhancers(
    applyMiddleware()
));

window.addEventListener('storage', function({key, newValue}){
    if (key !== localStorageKey) return;
    try {
        const data = JSON.parse(newValue);
        store.dispatch(updateState(data));
    } catch (e) {
        console.error(e);
    }
});

store.subscribe(() => {
    saveState(store.getState());
});

window.store = store;

function App() {
  return (
      <Provider store={store}>
        <Main/>
      </Provider>
  );
}

export default App;
