import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';


const configureStore = (history: any, preloadedState: any) => {
  const logger = createLogger();
  const middlewares = [thunk, logger, routerMiddleware(history)];
  const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  return createStore(rootReducer, preloadedState, composeEnhancers((applyMiddleware as any)(...middlewares)));
};


export default configureStore;
