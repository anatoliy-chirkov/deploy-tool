import { watcher as addService } from "./actions/addService";
import { watcher as getServices } from "./actions/getServices";
import reducer from './reducer';

export const sagas = [
    addService,
    getServices,
];
export { reducer };
