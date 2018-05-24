import * as React from 'react';
const PureComponent = React.PureComponent;
import {Link, Route} from 'react-router-dom';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
export const cx = classNames.bind(style);

const NotFoundMsg = props => {
  if (props.staticContext) {
    props.staticContext.status = 404;
  }
  return (
    <div className={cx('notfound')}>
      <div className={cx('notfound__inner')}>
        <div className={cx('notfound__title')}>404</div>
        <h1>Простите!</h1>
        <div>
          Такой страницы не существует.<br />
          Попробуйте перейти на главную страницу.
        </div>
        <Link className={cx('notfound__link')} to="/todo">На главную</Link>
      </div>
    </div>
  );
};

class NotFound extends PureComponent {
  render() {
    return (
      <Route component={NotFoundMsg}/>
    );
  }
}

export default NotFound;
