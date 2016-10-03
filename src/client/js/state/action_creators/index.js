import * as types from '../constants/ActionTypes';

export function login(payload) {
    return {
        type: types.LOGIN,
        payload
    };
}

export function logout() {
    return {
        type: types.LOGOUT
    };
}

export function getShowcase(params) {
    return {
        type: types.GET_SHOWCASE,
        payload: params || {}
    };
}

export function loadCardsForResources(resourcesData) {
    return {
        type: types.LOAD_CARDS_FOR_RESOURCES,
        payload: resourcesData
    };
}
