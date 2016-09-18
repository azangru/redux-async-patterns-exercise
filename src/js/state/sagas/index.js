import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';
import {login} from '~/api/login';

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

export default loginSaga;
