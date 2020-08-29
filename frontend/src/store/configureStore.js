import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  return {
    ...createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run
  };
}
