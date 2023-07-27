import { App } from './app';
import 'dotenv/config';
import connectionDB from './database/connection/connection';

const PORT = process.env.APP_PORT || 3001;

connectionDB();

new App().start(PORT);