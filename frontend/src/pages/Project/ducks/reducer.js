import initState from './config/initState';
import constants from './config/constants';
import addServiceConstants from '../AddService/ducks/config/constants';

export default function(state = initState, action) {
  switch (action.type) {
    case constants.project.request:
    case addServiceConstants.addService.request:
        return {...state, isLoading: true};
    case addServiceConstants.addService.success:
        return {...state, project: {...state.project, services: [...state.project.services, action.payload]}, isLoading: false};
    case constants.project.success:
    case constants.project.fail:
        return {...state, ...action.payload, isLoading: false};
    default:
        return state;
  }
}
