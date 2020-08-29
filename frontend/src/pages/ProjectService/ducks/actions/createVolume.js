import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.createVolume);
export const createVolume = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.createVolume,
  'http://localhost:756/api/projects/:projectId/services/:serviceId/volumes',
  'POST'
);
export const watcher = sagaWatcher.watcher;
