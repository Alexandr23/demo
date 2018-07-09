const router = require('express').Router();
import User from '../models/user';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

router.post('/api/login', (req, res) => {
  console.log('/api/login', req.body);

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(500).send({
        message: 'Ошибка на сервере',
        data: err,
      });
    } else if (!user) {
      res.status(401).send({
        message: 'Authentication failed. User not found.',
      });
    } else {
      if (!user.comparePassword(req.body.password)) {
        res.status(401).send({
          message: 'Authentication failed. Wrong username or password.',
        });
      } else {
        res.status(200).send({
          message: 'Авторизация прошла успешно.',
          token: jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs', { expiresIn: 10 }),
        });
      }
    }
  });
});

router.post('/api/register', (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  const hash = bcrypt.hashSync(user.password, 10);

  console.log('/api/register', user, hash);

  newUser.hash = hash;

  newUser.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: 'Ошибка на сервере',
        data: err,
      });
    } else {
      user.hash = undefined;
      res.status(200).send({
        message: 'Регистрация прошла успешно.',
        data: user,
      });
    }
  });
});

module.exports = router;
