import db from '../db';
const Scheme = db.Schema;
const router = require('express').Router();

const todoScheme = new Scheme({
  title: {
    type: String,
    required: true,
    maxLength: 256,
  },
  time: {
    type: String,
    required: true,
    default: Date.now,
  },
  bg: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 7,
  },
}, {
  versionKey: false,
});

const Todo = db.model('Todo', todoScheme);

router.get('/api/todos', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      console.log(err);
      res.status(500).send('Ошибка на сервере');
    }

    console.log(todos);
    res.status(200).send(todos);
  });
});

router.post('/api/todos', (req, res) => {
  const todo = req.body;

  console.log(req.body);

  Todo.create(todo, (err, todo) => {
    if (err) {
      console.log(err);
      res.status(500).send('Ошибка на сервере');
    }

    res.status(200).send(todo);
  });
});

module.exports = router;