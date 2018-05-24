import * as React from 'react';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
export const cx = classNames.bind(style);

interface IProps {
  children: string;
  disabled?: boolean;
}

class Button extends React.PureComponent<IProps> {
  render() {
    const { children, disabled } = this.props;

    return (
      <button className={cx('button')} disabled={ disabled }>{ children }</button>
    );
  }
}

export default Button;
