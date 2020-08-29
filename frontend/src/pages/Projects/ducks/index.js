import { watcher as getProjects } from "./actions/getProjects";
import reducer from './reducer';

export const sagas = [
    getProjects,
];
export { reducer };
