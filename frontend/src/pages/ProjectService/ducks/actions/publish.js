import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.publish);
export const publish = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.publish,
  'http://localhost:756/api/projects/:projectId/services/:serviceId/publish',
  'PATCH'
);
export const watcher = sagaWatcher.watcher;
