// import '../styles/styles.scss'; // eslint-disable-line import/no-unresolved

import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import store from '~/state/store';
import routes from '~/routes';


class App extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <Router history={browserHistory} routes={routes} />
            </Provider>
        );
    }
}

export default App;
