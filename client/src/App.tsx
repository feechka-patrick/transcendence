import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Alerts from './components/Alerts';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';

const App = () => (
  <>
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>

    <Alerts />
  </>
);

export default App;
