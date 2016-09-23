import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from '~/state/store';
import routes from '~/routes';
import rootSaga from '~/state/sagas';

let initialData;
if (typeof window !== 'undefined') {
    initialData = window.__data;
}

const store = configureStore(initialData);
store.runSaga(rootSaga);

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
