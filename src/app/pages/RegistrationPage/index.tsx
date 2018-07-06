import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../models/store';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Title from '../../components/Title';
import { register } from '../../redux/user';
import { IUserState } from '../../models/user';

/* Styles */
const style = require('./style.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(style);

interface IRegistrationForm {
  username: string;
  password: string;
  confirmPassword: string;
}

interface IProps {
  user: IUserState;
  register: any;
}

interface IState {
  form: IRegistrationForm;
}

class RegistrationPage extends React.Component<IProps, IState> {
  static DEFAULT_FORM = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      form: RegistrationPage.DEFAULT_FORM,
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

    const { username, password, confirmPassword } = this.state.form;

    if (password.length === 0 || password !== confirmPassword) {
      alert('Ошибка валидации');
      return;
    }

    this.props
      .register({ username, password })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.setState({ form: RegistrationPage.DEFAULT_FORM });
  };

  render() {
    const { username, confirmPassword, password } = this.state.form;

    return (
      <Layout>
        <form className={cx('form')} onSubmit={this.submit}>
          <Title className={cx('title')}>Регистрация</Title>
          <Input type="text" name="username" onChange={this.onChange} value={username} placeholder="Имя" />
          <Input type="password" name="password" onChange={this.onChange} value={password} placeholder="Пароль" />
          <Input
            type="password"
            name="confirmPassword"
            onChange={this.onChange}
            value={confirmPassword}
            placeholder="Повторите пароль"
          />
          <Button className={cx('button')}>Зарегистироваться</Button>
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
    register,
  },
)(RegistrationPage);
