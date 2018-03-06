import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import RouteDef from './routes';

render(
  <RouteDef />,
  document.getElementById('app')
);