import initState from './config/initState';
import constants from './config/constants';
import createProjectConstants from '../CreateProject/ducks/config/constants';

export default function(state = initState, action) {
  switch (action.type) {
    case constants.projects.request:
        return {...state, isLoading: true};
    case constants.projects.success:
        return {...state, data: [...action.payload], isLoading: false};
    case constants.projects.fail:
        return {...state, ...action.payload, isLoading: false};
    case createProjectConstants.createProject.success:
        return {...state, data: [...state.data, action.payload]}
    default:
        return state;
  }
}
