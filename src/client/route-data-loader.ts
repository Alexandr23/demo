import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Location, History } from 'history';

interface IProps {
  location: Location;
  match: any;
  history: History;
  routes: any;
  store: any;
}

export const RouteDataLoader = withRouter<IProps>(
  class extends React.Component<IProps> {
    componentWillReceiveProps(nextProps) {
      if (nextProps.location.pathname !== this.props.location.pathname) {
        matchRoutes(this.props.routes, nextProps.location.pathname).forEach(({ route, match }) => {
          if (route.loadData instanceof Function) {
            const { store } = this.props;
            const { params } = match;
            const query = nextProps.location.pathname;
            route.loadData({ store, params, query });
          }
        });
      }
    }

    render() {
      return this.props.children;
    }
  },
);
