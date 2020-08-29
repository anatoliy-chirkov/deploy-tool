import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.getVolumes);
export const getVolumes = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.getVolumes,
  'http://localhost:756/api/projects/:projectId/services/:serviceId/volumes'
);
export const watcher = sagaWatcher.watcher;
