import initState from './config/initState';
import constants from './config/constants';

export default function(state = initState, action) {
  switch (action.type) {
    case constants.getEnvVars.request:
        return {...state, envVars: {...state.envVars, error: null, isLoading: true}};
    case constants.getEnvVars.success:
        return {...state, envVars: {...state.envVars, data: [...action.payload], isLoading: false}};
    case constants.getEnvVars.fail:
        return {...state, envVars: {...state.envVars, ...action.payload, isLoading: false}};

    case constants.getVolumes.request:
        return {...state, volumes: {...state.volumes, error: null, isLoading: true}};
    case constants.getVolumes.success:
        return {...state, volumes: {...state.volumes, data: [...action.payload], isLoading: false}};
    case constants.getVolumes.fail:
        return {...state, volumes: {...state.volumes, ...action.payload, isLoading: false}};

    case constants.updateEnvVar.request:
        return {...state, updateEnvVar: {...state.updateEnvVar, error: null, isLoading: true}};
    case constants.updateEnvVar.success:
        return {
            ...state,
            updateEnvVar: {...state.updateEnvVar, isLoading: false},
            envVars: {...state.envVars, data: [...state.envVars.data, action.payload]}
        };
    case constants.updateEnvVar.fail:
        return {...state, updateEnvVar: {...state.updateEnvVar, ...action.payload, isLoading: false}};

    case constants.createVolume.request:
        return {...state, createVolume: {...state.createVolume, error: null, isLoading: true}};
    case constants.createVolume.success:
        return {
            ...state,
            createVolume: {...state.createVolume, isLoading: false},
            volumes: {...state.volumes, data: [...state.volumes.data, action.payload]}
        };
    case constants.createVolume.fail:
        return {...state, createVolume: {...state.createVolume, ...action.payload, isLoading: false}};

    case constants.updateVolume.request:
        return {...state, updateVolume: {...state.updateVolume, error: null, isLoading: true}};
    case constants.updateVolume.success:
        return {
            ...state,
            createVolume: {...state.updateVolume, isLoading: false},
            volumes: {...state.volumes, data: [...state.volumes.data, action.payload]}
        };
    case constants.updateVolume.fail:
        return {...state, updateVolume: {...state.updateVolume, ...action.payload, isLoading: false}};

    case constants.deleteVolume.request:
        return {...state, deleteVolume: {...state.deleteVolume, error: null, isLoading: true}};
    case constants.deleteVolume.success:
        return {...state, deleteVolume: {...state.deleteVolume, isLoading: false}};
    case constants.deleteVolume.fail:
        return {...state, deleteVolume: {...state.deleteVolume, ...action.payload, isLoading: false}};

    default:
        return state;
  }
}
