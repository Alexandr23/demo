const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const compression = require('compression');
const Chalk = require('chalk');
const appConfig = require('../../config/main');
const bodyParser = require('body-parser');

const IS_PROD = process.env.NODE_ENV === 'production';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, IS_PROD ? 'static/icons/' : '../src/server/public/icons', 'favicon.ico')));
app.use(compression());
app.use(express.static(path.join(__dirname, '/')));
app.use(require('./session').default);
app.use(require('./api/todos'));
app.use(require('./routes'));

app.listen(appConfig.port, appConfig.host, err => {
  if (err) {
    console.error(Chalk.bgRed(err));
  } else {
    console.info(
      Chalk.black.bgGreen(
        `\n-----------------------------------`,
        `\n💂  Listening at http://${appConfig.host}:${appConfig.port}`,
        `\n-----------------------------------`,
        `\n`,
      ),
    );
  }
});

export default app;
