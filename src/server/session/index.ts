import db from '../db';
const session = require('express-session');
// import * as connectMongo from 'connect-mongo';
const connectMongo = require('connect-mongo');

const MongoStore = connectMongo(session);

export default session({
  secret: 'bizdec',
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true, // https only
    maxAge: 10 * 60 * 1000,
  },
  store: new MongoStore({ mongooseConnection: db.connection }),
});
