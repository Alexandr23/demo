import * as axios from 'axios';
const mainConfig = require('../../../config/main.js');

const request = (axios as any).create({
  baseURL: mainConfig.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
