import { fork, join } from 'redux-saga/effects';

/**
* This is a helper function for server-side rendering. Its purpose is to start
* all sagas required to fetch the data necessary for rendering a particular page.
*
* It accepts an array of arrays, each of which consists of a preloader saga and its arguments:
* e.g.: [[saga1, arg1, arg2], [saga3, arg 3]]
*
* Each of these inner arrays is then passed to Redux Saga’s fork function
* (see its signature here: http://yelouafi.github.io/redux-saga/docs/api/index.html#forkfn-args)
* 
* The idea is borrowed from this repository: https://github.com/xkawi/react-universal-saga/blob/master/src/sagas/waitAll.js
*/

export default (sagas) => function* generateTasks() {
    const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params));
    yield tasks.map(join);
};
