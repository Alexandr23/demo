import * as React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
export const cx = classNames.bind(style);

interface IProps {
  children: React.ReactNode;
  location: any;
  match: any;
  history: any;
}

class Layout extends React.PureComponent<IProps> {
  render() {
    const {
      children,
      location: { pathname },
    } = this.props;

    const routes = [
      {
        path: '/login',
        title: 'Вход',
      },
      {
        path: '/registration',
        title: 'Регистрация',
      },
      {
        path: '/todo',
        title: 'Todo',
      },
    ];

    return (
      <div className={cx('layout')}>
        <div className={cx('layout__inner')}>
          <div className={cx('layout__content')}>
            <div className={cx('layout__links')}>
              {routes.length > 0 &&
                routes.map(({ path, title }) => (
                  <Link
                    className={cx({
                      layout__link: true,
                      layout__link_active: pathname === path,
                    })}
                    to={path}
                    key={path}
                  >
                    {title}
                  </Link>
                ))}
            </div>

            <div className={cx('layout__box')}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter<IProps>(Layout);
