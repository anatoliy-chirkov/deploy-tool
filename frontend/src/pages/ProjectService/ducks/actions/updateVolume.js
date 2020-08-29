import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.updateVolume);
export const updateVolume = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.updateVolume,
  'http://localhost:756/api/projects/:projectId/services/:serviceId/vars/:id',
  'PUT'
);
export const watcher = sagaWatcher.watcher;
