import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import {showcaseFetcher, resourcesFetcher} from '~/api/showcase';
import {mergeFetchedResources, addMetadataToNormalizedShowcase} from '~/state/helpers/showcase-helpers';

// normalizr-related imports
import { normalize } from 'normalizr';
import { showcase as schowcaseSchema } from '~/state/schemas/showcase';

/**
* @param {type: String, payload: Object}  — action passed automatically
*        by takeEvery in showcaseSaga; the payload object contains showcase and tab fields
*/
export function* fetchShowcase(action) {
    try {
        const {showcase: showcaseName, tab: tabName} = action.payload;
        const showcase = yield call(showcaseFetcher, showcaseName);
        const tabs = showcase.tabs;
        const activeTab = tabs.filter((tab) => tab.slug === tabName)[0] || tabs[0];
        // TODO: filter out iframe widget resources and subscription widget resources
        const activeTabResources = activeTab.resources;
        const activeTabResourcesUrls = activeTabResources.map(resource => resource.url);
        const fetchedResources = yield call(resourcesFetcher, activeTabResourcesUrls);
        mergeFetchedResources(activeTabResources, fetchedResources);
        const normalizedShowcase = normalize(showcase, schowcaseSchema);
        addMetadataToNormalizedShowcase(normalizedShowcase, showcase, activeTab);
        yield put({type: types.SHOWCASE_FETCHED, payload: normalizedShowcase});
    } catch (e) {
        yield put({type: types.SHOWCASE_FETCH_FAILED, message: e.message});
    }
}

/**
* @param resourcesData is an array of objects with fields:
* - id: resource id,
* - url: url for fetching more cards for this resource
*/
function* loadCardsForResources({payload: resourcesData}) {
    try {
        const resourcesUrls = resourcesData.map((resourceData) => resourceData.url);
        const fetchedResources = yield call(resourcesFetcher, resourcesUrls);
        // request to the api for resource returns an object without id;
        // so adding ids here for further processing
        fetchedResources.forEach((resource, index) => {
            resource.id = resourcesData[index].id;
        });
        yield put({type: types.LOAD_CARDS_FOR_RESOURCES_SUCCESS, payload: fetchedResources});
    } catch (e) {
        console.log('could not fetch more cards for the resource', e);
    }
}

export function* showcaseSaga() {
    yield* takeEvery(types.GET_SHOWCASE, fetchShowcase);
}

export function* loadCardsForResourcesSaga() {
    yield* takeEvery(types.LOAD_CARDS_FOR_RESOURCES, loadCardsForResources);
}
