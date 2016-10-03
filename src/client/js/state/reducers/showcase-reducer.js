import * as types from '../constants/ActionTypes';

// normalizr-related imports
import { normalize } from 'normalizr';
import { resource as resourceSchema } from '~/state/schemas/showcase';



const initialShowcase = {
};

export default function showcaseReducer (state=initialShowcase, action) {

    switch (action.type) {
        case types.SHOWCASE_FETCHED:
            return mergeNewShowcase (state, action.payload);
        case types.LOAD_CARDS_FOR_RESOURCES_SUCCESS:
            return updateResources(state, action.payload);
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

const updateResources = (state, fetchedResources) => {
    const newState = Object.assign({}, state);
    fetchedResources.forEach((resource) => {
        const normalizedResource = normalize(resource, resourceSchema);
        const savedResource = newState.entities.resources[resource.id];
        
        // add new cards’ ids to the array of card ids in the corresponding resource
        
        savedResource.results = savedResource.results
            .concat(
                normalizedResource.entities.resources[resource.id].results
            );
        savedResource.has_next = resource.has_next;
        savedResource.next = resource.next;
        savedResource.previous = resource.previous;
        savedResource.page = resource.page;
        
        newState.entities.cards = Object.assign({}, newState.entities.cards, normalizedResource.entities.cards);
    });
    return newState;
};
