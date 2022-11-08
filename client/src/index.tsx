import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UserStore from './store/UserStore';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={
        {
            user: new UserStore()
        }
    }>
        <Provider store={store}>
            <App />
        </Provider>
    </Context.Provider>
    , document.getElementById('root'));

