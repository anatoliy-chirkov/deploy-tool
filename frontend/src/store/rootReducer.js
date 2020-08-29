import { combineReducers } from 'redux';
import auth from '@common/auth/authReducer';
import { reducer as projects } from '../pages/Projects/ducks';
import { reducer as createProject } from '../pages/Projects/CreateProject/ducks';
import { reducer as project } from '../pages/Project/ducks';
import { reducer as addService } from '../pages/Project/AddService/ducks';
import { reducer as projectService } from '../pages/ProjectService/ducks';

const rootReducer = combineReducers({
  auth,
  projects,
  createProject,
  project,
  addService,
  projectService,
});

export default rootReducer;
