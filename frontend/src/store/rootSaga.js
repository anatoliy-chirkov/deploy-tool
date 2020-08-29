import { all, fork } from 'redux-saga/effects';
import { authSagas } from '../common/auth';
import { sagas as projectsSagas } from '../pages/Projects/ducks';
import { sagas as createProjectSagas } from '../pages/Projects/CreateProject/ducks';
import { sagas as projectSagas } from '../pages/Project/ducks';
import { sagas as addServiceSagas } from '../pages/Project/AddService/ducks';
import { sagas as projectServiceSagas } from '../pages/ProjectService/ducks';

const rootSaga = function* () {
    yield all([
        ...authSagas.map(saga => fork(saga)),
        ...projectsSagas.map(saga => fork(saga)),
        ...createProjectSagas.map(saga => fork(saga)),
        ...projectSagas.map(saga => fork(saga)),
        ...addServiceSagas.map(saga => fork(saga)),
        ...projectServiceSagas.map(saga => fork(saga)),
    ]);
};

export default rootSaga;
