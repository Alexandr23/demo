import * as React from 'react';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
export const cx = classNames.bind(style);

interface IProps {
  children: React.ReactNode;
}

class Layout extends React.PureComponent<IProps> {
  render() {
    const { children } = this.props;

    return (
      <div className={cx('layout')}>
        <div className={cx('layout__inner')}>
          <div className={cx('layout__content')}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
