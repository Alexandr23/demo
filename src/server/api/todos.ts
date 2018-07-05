import Todo from '../models/todos';
import wss from '../ws';
const router = require('express').Router();


router.get('/api/todos', (req, res) => {
  if (req.session.view) {
    req.session.view++;
  } else {
    req.session.view = 1;
  }

  console.log(req.session.view);

  Todo.find({}, (err, todos) => {
    if (err) {
      console.log(err);
      res.status(500).send('Ошибка на сервере');
    }

    res.status(200).send(todos);
  });
});

router.post('/api/todos', (req, res) => {
  const todo = req.body;

  Todo.create(todo, (err, todo) => {
    if (err) {
      console.log(err);
      res.status(500).send('Ошибка на сервере');
    }

    wss.clients.forEach(client => {
      client.send('update');
    });

    res.status(200).send(todo);
  });
});

router.delete('/api/todos', (req, res) => {
  const id = req.body.id;

  Todo.findByIdAndRemove(id, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Ошибка на сервере');
    }

    wss.clients.forEach(client => {
      client.send('update');
    });

    res.status(200).send({ id });
  });
});

module.exports = router;