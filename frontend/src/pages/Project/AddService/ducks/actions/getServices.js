import constants from '../config/constants';
import RequestAction from '@common/actions/RequestAction';
import SagaWatcher from '@common/actions/SagaWatcher';

const requestAction = new RequestAction(constants.services);
export const getServices = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.services,
  'http://localhost:756/api/services'
);
export const watcher = sagaWatcher.watcher;
