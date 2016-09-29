import * as types from '../constants/ActionTypes';

const initialUser = {
    authenticated: false
};

export default function userReducer (state=initialUser, action) {

    switch (action.type) {
        case types.USER_FETCH_SUCCESS:
            return Object.assign ({}, state, action.payload, {authenticated: true});
        default:
            return state;
    }

}
