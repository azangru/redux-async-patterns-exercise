import '../styles/styles.scss'; // eslint-disable-line import/no-unresolved

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Router, browserHistory } from 'react-router';

import routes from '~/routes';
import reducers from '~/state/reducers';
import rootSaga from '~/state/sagas';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('main'));
