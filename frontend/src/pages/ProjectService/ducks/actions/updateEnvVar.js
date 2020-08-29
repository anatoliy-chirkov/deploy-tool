import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.updateEnvVar);
export const updateEnvVar = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.updateEnvVar,
  'http://localhost:756/api/projects/:projectId/services/:serviceId/vars/:id',
  'PUT'
);
export const watcher = sagaWatcher.watcher;
