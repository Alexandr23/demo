import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../models/store';
import Layout from '../../components/Layout';
import { login } from '../../redux/user';
import { IUserState } from '../../models/user';

/* Styles */
// const style = require('./style.scss');
// const classNames = require('classnames/bind');
// const cx = classNames.bind(style);

interface ILoginForm {
  login: string;
  password: string;
}

interface IProps {
  user: IUserState;
  login: any;
}

interface IState {
  form: ILoginForm;
}

class LoginPage extends React.Component<IProps, IState> {
  static DEFAULT_FORM = {
    login: '',
    password: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      form: LoginPage.DEFAULT_FORM,
    };
  }

  onChange = event => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  submit = event => {
    event.preventDefault();
    
    this.props.login(this.state.form)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.setState({ form: LoginPage.DEFAULT_FORM });
  };

  render() {
    const { login, password } = this.state.form;

    return (
      <Layout>
        <form onSubmit={this.submit}>
          <input type="text" name="login" onChange={this.onChange} value={login} placeholder="Логин" />
          <input type="password" name="password" onChange={this.onChange} value={password} placeholder="Пароль" />
          <button>Войти</button>
        </form>
      </Layout>
    );
  }
}

export default (connect as any)(
  (state: IStore) => ({
    user: state.user,
  }),
  {
    login,
  },
)(LoginPage);

