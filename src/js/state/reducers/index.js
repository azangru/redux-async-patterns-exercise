import { combineReducers } from 'redux';
import greetingReducer from './greeting-reducer';
import userReducer from './user-reducer';
import showcaseReducer from './showcase-reducer';

const rootReducer = combineReducers({
    greetingReducer,
    userReducer,
    showcaseReducer
});

export default rootReducer;
