/* istanbul ignore file */
import express from 'express';
import { appConfig } from './config';
import Logger from './config/logger';

const app = express();
global.logger = Logger.createLogger({ label: 'THE_SCHOOL_HUB' });

appConfig(app);

export default app;
