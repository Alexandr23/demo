import * as axios from 'axios';
const mainConfig = require('../../../config/main.js');

const upload = (axios as any).create({
  baseURL: mainConfig.baseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default upload;
