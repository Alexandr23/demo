import * as WebSocket from 'ws';
import * as config from '../../../config/main';

const wss = new WebSocket.Server({ port: config.ws.port });

wss.on('connection', ws => {
  ws.on('message', message => console.log(message));
  ws.send('WebSocket works');
});

export default wss;
