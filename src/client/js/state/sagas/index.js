import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';
import {login} from '~/api/login';
import {showcaseFetcher, tabFetcher} from '~/api/showcase';
import {mergeFetchedResourcesInTabs} from '~/state/helpers/showcase-helpers';

// normalizr-related imports
import { normalize } from 'normalizr';
import { showcase as schowcaseSchema } from '~/state/schemas/showcase';

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
        delete showcase.ab_test_code;
        const tabs = showcase.tabs;
        const firstTab = tabs[0];
        const resources = yield call(tabFetcher, firstTab);
        mergeFetchedResourcesInTabs(firstTab, resources);
        const normalizedShowcase = normalize(showcase, schowcaseSchema);
        yield put({type: types.SHOWCASE_FETCHED, payload: normalizedShowcase});
    } catch (e) {
        yield put({type: types.SHOWCASE_FETCH_FAILED, message: e.message});
    }
}

function* showcaseSaga() {
    yield* takeEvery(types.GET_SHOWCASE, fetchShowcase);
}

// GET_SHOWCASE_TITLES

export default function* rootSaga() {
    yield [
        loginSaga(),
        showcaseSaga()
    ];
}
