import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from '~/state/store';
import rootSaga from '~/state/sagas';

let initialData;
if (typeof window !== 'undefined') {
    initialData = window.__data;
}

const store = configureStore(initialData);
store.runSaga(rootSaga);

class App extends React.Component {
    // the props that this component receives from index.js will contain
    // the routes object, which needs to be passed to the Router container for
    // async route loading
    render () {
        return (
            <Provider store={store}>
                <Router {...this.props} history={browserHistory} />
            </Provider>
        );
    }
}

export default App;
