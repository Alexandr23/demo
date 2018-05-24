import * as React from 'react';
import Todo from '../../features/Todo';
import Layout from '../../components/Layout';

/* Styles */
// const style = require('./style.scss');
// const classNames = require('classnames/bind');
// const cx = classNames.bind(style);

class TodoPage extends React.Component {
  render() {
    return (
      <Layout>
        <Todo />
      </Layout>
    );
  }
}

export default TodoPage;
