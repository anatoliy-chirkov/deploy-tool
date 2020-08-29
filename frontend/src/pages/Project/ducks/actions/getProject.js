import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.project);
export const getProject = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.project,
  'http://localhost:756/api/projects/:id'
);
export const watcher = sagaWatcher.watcher;
