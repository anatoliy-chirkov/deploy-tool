import { watcher as getEnvVars } from "./actions/getEnvVars";
import { watcher as getVolumes } from "./actions/getVolumes";
import { watcher as createVolume } from "./actions/createVolume";
import { watcher as updateVolume } from "./actions/updateVolume";
import { watcher as deleteVolume } from "./actions/deleteVolume";
import { watcher as updateEnvVar } from "./actions/updateEnvVar";
import { watcher as publish } from "./actions/publish";
import reducer from './reducer';

export const sagas = [
    getEnvVars,
    getVolumes,
    createVolume,
    updateVolume,
    deleteVolume,
    updateEnvVar,
    publish
];
export { reducer };
