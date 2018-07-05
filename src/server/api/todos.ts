import db from '../db';
import wss from '../ws';
const Scheme = db.Schema;
const router = require('express').Router();

wss.on('connection', ws => {
  ws.on('message', message => console.log(message));
  ws.send('WebSocket works');
});

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