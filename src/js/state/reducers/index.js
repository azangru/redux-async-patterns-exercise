import { combineReducers } from 'redux';
import greetingReducer from './greeting-reducer';
import userReducer from './user-reducer';

const rootReducer = combineReducers({
    greetingReducer,
    userReducer
});

export default rootReducer;
