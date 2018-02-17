import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from './routes';
import RouteDef from './routes';
import App from './components/App';

render(
  <RouteDef />,
  document.getElementById('app')
);