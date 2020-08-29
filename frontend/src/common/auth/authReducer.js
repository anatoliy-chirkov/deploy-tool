import initState from './config/initState';
import constants from './config/constants';

export default function(state = initState, action) {
  switch (action.type) {
    case constants.stealthLogin.request:
      return {...state, ...action.payload, userId: 0}

    case constants.signOut.success:
    case constants.stealthLogin.fail:
      return {...state, userId: null, token: null}

    case constants.signIn.request:
        return {...state, isLoading: true};

    case constants.signIn.success:
    case constants.stealthLogin.success:
      return {...state, userId: action.payload.user_id, isLoading: false};

    case constants.signIn.fail:
        return {...state, ...action.payload, isLoading: false};

    default:
        return state;
  }
}
