import { watcher as getProject } from "./actions/getProject";
import reducer from './reducer';

export const sagas = [
    getProject,
];
export { reducer };
