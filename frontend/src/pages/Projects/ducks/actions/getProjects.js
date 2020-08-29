import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.projects);
export const getProjects = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.projects,
  'http://localhost:756/api/projects'
);
export const watcher = sagaWatcher.watcher;
