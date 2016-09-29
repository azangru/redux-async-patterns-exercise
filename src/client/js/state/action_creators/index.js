import * as types from '../constants/ActionTypes';

export function login(payload) {
    return {
        type: types.LOGIN,
        payload
    };
}

export function getShowcase(params) {
    return {
        type: types.GET_SHOWCASE,
        payload: params || {}
    };
}
