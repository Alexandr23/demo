import * as React from 'react';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
export const cx = classNames.bind(style);

interface IProps {
  value: string;
  onChange (event: any): void;
  placeholder?: string;
}

class Input extends React.PureComponent<IProps> {
  render() {
    const { value, onChange, placeholder } = this.props;

    return (
      <input className={cx('input')} type="text" value={value} onChange={onChange} placeholder={placeholder} />
    );
  }
}

export default Input;
