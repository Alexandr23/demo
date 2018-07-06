import * as React from 'react';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
export const cx = classNames.bind(style);

interface IProps {
  children?: string;
  className?: string;
}

class Title extends React.PureComponent<IProps> {
  render() {
    const { children, className } = this.props;

    return (
      <h1 className={cx('title', className)} >{children}</h1>
    );
  }
}

export default Title;
