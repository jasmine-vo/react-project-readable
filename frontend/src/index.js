import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import reducer from './reducers'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION()
)

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
)