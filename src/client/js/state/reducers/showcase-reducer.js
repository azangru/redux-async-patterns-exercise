import * as types from '../constants/ActionTypes';

const initialShowcase = {
};

export default function showcaseReducer (state=initialShowcase, action) {

    switch (action.type) {
        case types.SHOWCASE_FETCHED:
            return mergeNewShowcase (state, action.payload);
        default:
            return state;
    }

}

const mergeNewShowcase = (state, fetchedShowcase) => {
    // the showcase has been normalized using normalizr
    if (!state.result) {
        // this means that we have fetched the first showcase, and the state is empty
        return fetchedShowcase;
    } else {
        // this means that we already have fetched a showcase previously, so we need
        // to merge the data about the new showcase with the data about the previous showcase
        const newState = Object.assign({}, state);

        if (Array.isArray(newState.result)) {
            // we have already fetched at least 2 showcases
            newState.result.push(fetchedShowcase.result);
        } else {
            // we have previously fetched only 1 showcase
            newState.result = [newState.result, fetchedShowcase.result];
        }

        Object.assign(newState.entities.cards, fetchedShowcase.entities.cards);
        Object.assign(newState.entities.resources, fetchedShowcase.entities.resources);
        Object.assign(newState.entities.showcases, fetchedShowcase.entities.showcases);
        Object.assign(newState.entities.tabs, fetchedShowcase.entities.tabs);
        return newState;
    }
};
