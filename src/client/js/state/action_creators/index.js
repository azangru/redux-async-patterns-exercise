import * as types from '../constants/ActionTypes';

export function sayHello() {
    return {
        type: types.GREET,
        payload: {message: "Hello world!"}
    };
}

export function login(payload) {
    return {
        type: types.LOGIN,
        payload
    };
}

export function getShowcase() {
    return {
        type: types.GET_SHOWCASE
    };
}
