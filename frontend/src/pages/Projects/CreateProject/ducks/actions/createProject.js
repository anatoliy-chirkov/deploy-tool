import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.createProject);
export const createProject = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.createProject,
  'http://localhost:756/api/projects',
  'POST'
);
export const watcher = sagaWatcher.watcher;
