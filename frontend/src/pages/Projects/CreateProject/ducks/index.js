import { watcher as createProject } from "./actions/createProject";
import reducer from './reducer';

export const sagas = [
    createProject,
];
export { reducer };
