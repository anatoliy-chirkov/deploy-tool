import constants from '../config/constants';
import RequestAction from '../../actions/RequestAction';
import SagaWatcher from '../../actions/SagaWatcher';
import axios from 'axios';

const requestAction = new RequestAction(constants.signIn);
export const signIn = requestAction.request;

const sagaWatcher = new SagaWatcher(
  constants.signIn,
  'http://localhost:756/api/sign-in',
  'POST',
  (response) => {
    const bearerToken = response.data.token;
    localStorage.setItem('deploy_tool:token', bearerToken);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + bearerToken;
  }
);
export const watcher = sagaWatcher.watcher;
