/** General Configurations Like PORT, HOST names and etc... */

var IS_DEV = process.env.NODE_ENV === 'development';
var apiUrl = '';
var staticUrl = '';

if (typeof window !== 'undefined') {
  apiUrl = decodeURI(window['API_URL']);
  staticUrl = decodeURI(window['STATIC_URL']);
  delete window['API_URL'];
  delete window['STATIC_URL'];
} else {
  apiUrl = process.env.API_URL;
  staticUrl = process.env.STATIC_URL;
}

var config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8889,
  apiBaseUrl: !IS_DEV ? apiUrl : '',
  baseUrl: 'http://api.bmp.magonline.ru/',
  staticBaseUrl: !IS_DEV ? staticUrl : '',
};

module.exports = config;
