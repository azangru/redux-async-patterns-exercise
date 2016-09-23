import * as types from '../constants/ActionTypes';

export default function greetingReducer (state={}, action) {

    switch (action.type) {
        case types.GREET:
            return Object.assign ({}, state, {message: action.payload.message });
        case types.LOGIN_SUCCESS:
            return Object.assign ({}, state, {message: `Hello ${action.payload.username}!`});
        default:
            return state;
    }

}
