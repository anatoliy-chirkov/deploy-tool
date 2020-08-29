import {call, put, takeLatest, select} from "redux-saga/effects";
import Request from '../utils/Request';

class SagaWatcher {
    defaultServerErrorMessage = 'Сервис временно недоступен. Попробуйте позже.';

    constructor(constants, url, method = 'GET', successFunction = (response) => {}) {
        this.constants = constants;
        this.url = url;
        this.method = method;
        this.successFunction = successFunction;

        this.watcher = this.watcher.bind(this);
        this.worker = this.worker.bind(this);
    }

    *watcher() {
        yield takeLatest(this.constants.request, this.worker);
    }

    *worker(action) {
        try {
            let operatingUrl = this.url;

            const regExp = RegExp(/:[A-Za-z]+/, 'g');
            const found = operatingUrl.match(regExp);

            found && found.forEach((item) => {
                const name = item.replace(':', '');
                const value = action.payload[name];
                operatingUrl = operatingUrl.replace(item, value);
                delete action.payload[name];
            });

			const response = yield call(Request.make, operatingUrl, action.payload, this.method);
            yield put({
                type: this.constants.success,
                payload: response.data,
            });
            this.successFunction(response);
		} catch (e) {
            console.warn("Error: ", e);

            if (e.response.status >= 500) {
                yield put({
                    type: this.constants.fail,
                    payload: {
                        error: {
                            message: this.defaultServerErrorMessage,
                            stack: null,
                        },
                    },
                });
            }

            if (e.response.data !== undefined) {
                yield put({
                    type: this.constants.fail,
                    payload: {
                        error: e.response.data.error
                    },
                });
            }
		}
    }
}

export default SagaWatcher;
