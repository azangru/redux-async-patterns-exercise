import * as types from '../constants/ActionTypes';

const initialShowcase = {
    cards: []
};

export default function showcaseReducer (state=initialShowcase, action) {

    switch (action.type) {
        case types.SHOWCASE_FETCHED:
            return Object.assign ({}, state, {cards: state.cards.concat(action.payload) });
        default:
            return state;
    }

}
