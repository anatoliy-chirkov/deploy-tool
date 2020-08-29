import constants from '../config/constants';
import RequestAction from '../../actions/RequestAction';
import SagaWatcher from '../../actions/SagaWatcher';
import axios from 'axios';

const requestAction = new RequestAction(constants.signOut);
export const signOut = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.signOut,
  'http://localhost:756/api/sign-out',
  'GET',
  (response) => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
);
export const watcher = sagaWatcher.watcher;
