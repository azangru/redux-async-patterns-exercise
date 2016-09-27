import '../styles/styles.scss'; // eslint-disable-line import/no-unresolved

import React from 'react';
import ReactDOM from 'react-dom';
import { match, browserHistory } from 'react-router';
import App from './app';
import routes from '~/routes';

match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
    if (error) {
        return console.error('BrowserEntry match error', error);
    }
    ReactDOM.render(<App {...renderProps} />, document.querySelector('main'));
});
