import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import reducers from '~/state/reducers';
// import rootSaga from '~/state/sagas';

// const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(sagaMiddleware)
    );


    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}

// sagaMiddleware.run(rootSaga);
