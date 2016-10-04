import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';
import {login, getUser, logout} from '~/api/user';

function* loginUser(action) {
    try {
        const loginResult = yield call(login, action.payload);
        if (loginResult.success) {
            yield call(fetchUser);
            browserHistory.push('/');
        }
    } catch (e) {
        yield put({type: "LOGIN_FAILED", message: e.message});
    }
}

/**
* @param cookies — optional; is provided during server-side rendering
*/
export function* fetchUser(cookies) {
    try {
        const user = yield call(getUser, cookies);
        if (user) {
            yield put({type: types.USER_FETCH_SUCCESS, payload: user});
        }
    } catch (e) {
        yield put({type: "LOGIN_FAILED", message: e.message});
    }
}

function* logoutUser() {
    try {
        const hasLoggedOut = yield call(logout);
        if (hasLoggedOut) {
            yield put({type: types.LOGOUT_SUCCESS});
        }
    } catch (e) {
        yield put({type: "LOGOUT_FAILED", message: e.message});
    }
}

export function* loginSaga() {
    yield* takeEvery(types.LOGIN, loginUser);
}

export function* logoutSaga() {
    yield* takeEvery(types.LOGOUT, logoutUser);
}
