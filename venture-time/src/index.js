import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import { API_WS_ROOT } from './constants';
import { ActionCableProvider } from 'react-actioncable-provider';

ReactDOM.render(

  <ActionCableProvider url={API_WS_ROOT}>
    <Router>
      <App />
    </Router>
  </ActionCableProvider>, document.getElementById('root'));
registerServiceWorker();
