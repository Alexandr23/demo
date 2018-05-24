import * as React from 'react';
import {Provider} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import {createBrowserHistory} from 'history';
import {ConnectedRouter} from 'react-router-redux';
import routes from '../app/routes';
import configureStore from '../app/redux/store';
import { RouteDataLoader } from './route-data-loader';

const history = createBrowserHistory();

const store = configureStore(history, window.__INITIAL_STATE__);
const Root = () => (
  <Provider store={store} key="provider">
    <ConnectedRouter history={history}>
      <RouteDataLoader routes={routes} store={store}>
        {renderRoutes(routes)}
      </RouteDataLoader>
    </ConnectedRouter>
  </Provider>
);
export default Root;
