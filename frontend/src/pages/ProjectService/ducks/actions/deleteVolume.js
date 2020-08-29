import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.deleteVolume);
export const deleteVolume = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.deleteVolume,
  'http://localhost:756/api/projects/:projectId/services/:serviceId/volumes/:id',
  'DELETE'
);
export const watcher = sagaWatcher.watcher;
