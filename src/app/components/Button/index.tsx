import * as React from 'react';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
export const cx = classNames.bind(style);

interface IProps {
  children: string;
  className?: string;
  disabled?: boolean;
}

class Button extends React.PureComponent<IProps> {
  render() {
    const { children, disabled, className } = this.props;

    return (
      <button className={cx('button', className)} disabled={ disabled }>{ children }</button>
    );
  }
}

export default Button;
