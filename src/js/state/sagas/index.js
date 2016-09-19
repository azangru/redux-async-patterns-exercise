import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';
import {login} from '~/api/login';
import {showcaseFetcher} from '~/api/showcase';

function* fetchUser(action) {
    try {
        const user = yield call(login, action.payload);
        browserHistory.push('/');
        yield put({type: types.LOGIN_SUCCESS, payload: user});
    } catch (e) {
        yield put({type: "LOGIN_FAILED", message: e.message});
    }
}

function* loginSaga() {
    yield* takeEvery(types.LOGIN, fetchUser);
}


export function* fetchShowcase() {
    try {
        const showcase = yield call(showcaseFetcher);
        const titles = showcase[2].filter((title) => !!title);
        yield put({type: types.SHOWCASE_FETCHED, payload: titles});
    } catch (e) {
        yield put({type: "LOGIN_FAILED", message: e.message});
    }
}

function* showcaseSaga() {
    yield* takeEvery(types.GET_SHOWCASE_TITLES, fetchShowcase);
}

// GET_SHOWCASE_TITLES

export default function* rootSaga() {
    yield [
        loginSaga(),
        showcaseSaga()
    ];
}
