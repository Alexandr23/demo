import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { Store } from 'redux';
import { IStore } from '../app/models/store';

const serialize = require('serialize-javascript');
const mainConfig = require('../../config/main');
const publicPath = 'http://' + mainConfig.host + ':' + (+mainConfig.port + 1);
const IS_PROD = process.env.NODE_ENV === 'production';
const basePath = IS_PROD ? mainConfig.staticBaseUrl : publicPath;

interface IProps {
  markup: string;
  store: Store<IStore>;
}

export class Html extends React.Component<IProps> {
  private resolve(file: string) {
    return IS_PROD ? `${basePath}/client/${file}` : `${basePath}/${file}`;
  }

  public render() {
    const { markup, store } = this.props;
    const helmet = Helmet.renderStatic();
    const initialState = `window.__INITIAL_STATE__=${serialize(store.getState(), { isJSON: true })};`;
    const envs = [
      `window.API_URL='${encodeURI(process.env.API_URL)}';`,
      `window.STATIC_URL='${encodeURI(process.env.STATIC_URL)}';`,
    ].join('');

    return (
      <html>
        <head>
          {helmet.title.toComponent()}
          {helmet.link.toComponent()}
          {IS_PROD && <link rel="stylesheet" href={this.resolve('styles.css')} />}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          <script charSet="UTF-8" dangerouslySetInnerHTML={{ __html: initialState }} />
          {IS_PROD && <script charSet="UTF-8" dangerouslySetInnerHTML={{ __html: envs }} />}
          <script src={this.resolve('vendor.js')} />
          <script src={this.resolve('app.js')} />
        </body>
      </html>
    );
  }
}

export default function html(markup, store) {
  const html = ReactDOMServer.renderToString(<Html markup={markup} store={store} />);

  return `<!doctype html> ${html}`;
}