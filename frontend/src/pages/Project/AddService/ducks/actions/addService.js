import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.addService);
export const addService = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.addService,
  'http://localhost:756/api/projects/:projectId/services',
  'POST'
);
export const watcher = sagaWatcher.watcher;
