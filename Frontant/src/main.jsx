import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
// createRoot(document.getElementById('root')).render(<App />);