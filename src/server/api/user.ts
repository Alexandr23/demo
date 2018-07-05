const router = require('express').Router();
import User from '../models/user';


router.post('/api/login', (req, res) => {
  const user = req.body;

  console.log('/api/login', user);

  res.status(200).send({
    message: 'Ура! Вы залогинились.',
    data: user,
  });
});

router.post('/api/register', (req, res) => {
  const user = req.body;

  console.log('/api/register', user);

  User.create(user, (err, user) => {
    if (err) {
      console.log(err.errors);
      console.log('______________');
      console.log(user);
      res.status(500).send('Ошибка на сервере');
    } else {
      res.status(200).send({
        message: 'Регистрация прошла успешно.',
        data: user,
      });
    }
  });
});

module.exports = router;
