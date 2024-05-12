import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import ReactDOM from 'react-dom';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import LevelContextProvider from '../Context/ContextProduct';


const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}
createRoot(document.getElementById('root')).render(
  <LevelContextProvider>
   
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
  
  </LevelContextProvider>,
);

// createRoot(document.getElementById('root')).render(<App />);