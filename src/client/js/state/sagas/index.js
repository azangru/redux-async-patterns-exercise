import { fork } from 'redux-saga/effects';

import {showcaseSaga, loadCardsForResourcesSaga} from './showcaseSagas';
import {loginSaga, logoutSaga} from './userSagas';

export default function* rootSaga() {
    yield [
        fork(loginSaga),
        fork(logoutSaga),
        fork(showcaseSaga),
        fork(loadCardsForResourcesSaga)
    ];
}
