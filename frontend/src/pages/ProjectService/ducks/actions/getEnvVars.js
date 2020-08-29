import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.getEnvVars);
export const getEnvVars = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.getEnvVars,
  'http://localhost:756/api/projects/:projectId/services/:serviceId/vars'
);
export const watcher = sagaWatcher.watcher;
