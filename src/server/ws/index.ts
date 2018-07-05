import * as WebSocket from 'ws';
import * as config from '../../../config/main';

export default new WebSocket.Server({ port: config.ws.port });
