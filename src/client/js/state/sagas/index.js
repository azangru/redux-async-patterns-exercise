import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';
import {login, getUser} from '~/api/user';
import {showcaseFetcher, tabFetcher} from '~/api/showcase';
import {mergeFetchedResourcesInTabs} from '~/state/helpers/showcase-helpers';

// normalizr-related imports
import { normalize } from 'normalizr';
import { showcase as schowcaseSchema } from '~/state/schemas/showcase';

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

function* fetchUser() {
    try {
        const user = yield call(getUser);
        yield put({type: types.USER_FETCH_SUCCESS, payload: user});
    } catch (e) {
        yield put({type: "LOGIN_FAILED", message: e.message});
    }
}

function* loginSaga() {
    yield* takeEvery(types.LOGIN, loginUser);
}

/**
* @param {type: String, payload: Object}  — action passed automatically
*        by takeEvery in showcaseSaga; the payload object contains showcase and tab fields
*/
export function* fetchShowcase(action) {
    try {
        const {showcase: showcaseName, tab: tabName} = action.payload;
        const showcase = yield call(showcaseFetcher, showcaseName);
        delete showcase.ab_test_code;
        const tabs = showcase.tabs;
        const activeTab = tabs.filter((tab) => tab.slug === tabName)[0] || tabs[0];
        const resources = yield call(tabFetcher, activeTab);
        mergeFetchedResourcesInTabs(activeTab, resources);
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
