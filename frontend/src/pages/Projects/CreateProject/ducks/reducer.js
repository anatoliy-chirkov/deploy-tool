import initState from './config/initState';
import constants from './config/constants';

export default function(state = initState, action) {
  switch (action.type) {
    case constants.createProject.request:
        return {...state, isLoading: true};
    case constants.createProject.success:
    case constants.createProject.fail:
        return {...state, ...action.payload, isLoading: false};
    default:
        return state;
  }
}
