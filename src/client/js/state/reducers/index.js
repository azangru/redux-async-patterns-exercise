import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import showcaseReducer from './showcase-reducer';

const rootReducer = combineReducers({
    userReducer,
    showcaseReducer
});

export default rootReducer;
