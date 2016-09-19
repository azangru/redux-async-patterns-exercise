import { fork, join } from 'redux-saga/effects';

export default (sagas) => function* genTasks() {
  const tasks = yield sagas.map((saga) => fork(saga));
  yield tasks.map(join);
};
