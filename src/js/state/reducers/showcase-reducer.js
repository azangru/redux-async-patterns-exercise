import * as types from '../constants/ActionTypes';

const initialShowcase = {
    titles: []
};

export default function showcaseReducer (state=initialShowcase, action) {

    switch (action.type) {
        case types.SHOWCASE_FETCHED:
            return Object.assign ({}, state, {titles: action.payload });
        default:
            return state;
    }

}
