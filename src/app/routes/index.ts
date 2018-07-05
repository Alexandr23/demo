import App from '../../client/app';
import NotFound from '../components/NotFound';
import TodoPage from '../pages/Todo'
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/todo',
        component: TodoPage,
        title: 'Todo',
        exact: true,
        // loadData: ({ store, params, query }) => {
        //   return Promise.all([
        //     store.dispatch(Actions1),
        //     store.dispatch(Actions2),
        //   ]);
        // },
      },
      {
        path: '/login',
        component: LoginPage,
        title: 'Вход',
        exact: true,
      },
      {
        path: '/registration',
        component: RegistrationPage,
        title: 'Регистрация',
        exact: true,
      },
      {
        component: NotFound,
        title: '404 Not Found',
        isNotFound: true,
      },
    ],
  },
];

export default routes;
