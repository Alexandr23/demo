import * as React from 'react';
const {PureComponent} = React;
import {withRouter} from 'react-router-dom';
import Helmet from 'react-helmet';
import {matchRoutes, renderRoutes} from 'react-router-config';

interface IProps {
  route?: any;
  history: any;
  location: any;
  match: any;
}

class App extends PureComponent<IProps> {

  render() {
    const routes = this.props.route.routes;
    const pathname = this.props.location.pathname;
    const route = matchRoutes(routes, pathname)[0];
    const title = route && route.route.title ? `${route.route.title} | Big Market Place` : 'Big Market Place';

    return (
      <>
        <Helmet defaultTitle={title} titleTemplate="%s | Big Market Place">
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Helmet>
        {renderRoutes(routes)}
      </>
    );
  }
}

export default withRouter<IProps>(App);
