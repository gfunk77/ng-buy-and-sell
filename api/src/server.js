import Hapi from '@hapi/hapi';
import routes from './routes/index.js';
import { db } from './db.js';
import * as admin from 'firebase-admin';
import credentials from '../credentials.json';

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

let server;

const start = async () => {
  server = Hapi.server({
    port: 8000,
    host: 'localhost',
  });

  routes.forEach((route) => {
    return server.route(route);
  });

  db.connect();
  await server.start();
  console.log('Server running on', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

process.on('SIGINT', async () => {
  console.log('stopping hapi server...');
  await server.stop({ timeout: 10000 });
  db.end();
  console.log('Server stopped');
  process.exit(0);
});

start();
