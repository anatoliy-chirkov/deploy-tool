import initState from './config/initState';
import constants from './config/constants';

export default function(state = initState, action) {
  switch (action.type) {
    case constants.addService.request:
    case constants.services.request:
        return {...state, isLoading: true};
    case constants.addService.success:
    case constants.addService.fail:
    case constants.services.fail:
        return {...state, ...action.payload, isLoading: false};
    case constants.services.success:
      return {...state, data: [...action.payload], isLoading: false};
    default:
        return state;
  }
}
