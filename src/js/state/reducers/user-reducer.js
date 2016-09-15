import * as types from '../constants/ActionTypes';

const initialUser = {
    authenticated: false
};

export default function userReducer (state=initialUser, action) {

    switch (action.type) {
        case types.AUTHENTICATION_SUCCESS:
            return Object.assign ({}, state, {user: action.payload });
        default:
            return state;
    }

}
