import constants from '../config/constants';
import RequestAction from '../../actions/RequestAction';
import SagaWatcher from '../../actions/SagaWatcher';

const requestAction = new RequestAction(constants.stealthLogin);
export const stealthLogin = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.stealthLogin,
  'http://localhost:756/api/me'
);
export const watcher = sagaWatcher.watcher;
