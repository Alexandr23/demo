import * as React from 'react';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
export const cx = classNames.bind(style);

interface IProps {
  value: string;
  onChange?: (event: any) => void;
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
}

class Input extends React.PureComponent<IProps> {
  static defaultProps = {
    type: 'text',
  };

  render() {
    const { value, type, onChange, placeholder, id, name } = this.props;

    return (
      <input
        className={cx('input')}
        type={type}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
}

export default Input;
