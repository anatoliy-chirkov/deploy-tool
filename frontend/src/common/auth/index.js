import {watcher as signInSaga} from "./actions/signIn";
import {watcher as stealthLoginSaga} from "./actions/stealthLogin";
import {watcher as signOutSaga} from "./actions/signOut";

export const authSagas = [
    signInSaga,
    stealthLoginSaga,
    signOutSaga
];
