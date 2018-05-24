import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import html from '../html';
import routes from '../../app/routes';
import reducers from '../../app/redux/reducers';
const path = require('path');

const basePath = process.env.NODE_ENV === 'production' ? 'static' : '../src/server/public';
const router = require('express').Router();

router.get('*', (req, res) => {
  const store = createStore(reducers, applyMiddleware(thunk));
  const branch = matchRoutes(routes, req.path).filter(({ route }) => route.loadData instanceof Function);
  const promises = branch.map(({ route, match }) =>
    route.loadData({
      store,
      query: req._parsedOriginalUrl.search,
      params: match.params,
    }),
  );

  Promise.all(promises)
    .then(() => {
      const context = {};
      const markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>,
      );

      res.status(200).send(html(markup, store));
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .sendFile(path.join(__dirname, basePath, 'errors/500.html'));
    });
});

module.exports = router;
