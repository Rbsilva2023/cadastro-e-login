import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.scss';
import Context from './context/Context.jsx';
import TechContext from './context/TechContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TechContext>
      <Context>
        <App />
      </Context>
    </TechContext>
  </React.StrictMode>,
);
