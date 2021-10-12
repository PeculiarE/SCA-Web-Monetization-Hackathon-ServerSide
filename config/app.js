/* eslint-disable no-unused-vars */
import morgan from 'morgan';
import compression from 'compression';
import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import expressFileUpload from 'express-fileupload';
import { helpers, genericErrors, constants } from '../app/utils';
import config from './env';
import apiV1Routes from '../app/routes/v1';
import { redisDB } from '../app/db';

const { GenericHelper: { errorResponse, successResponse } } = helpers;
const { WELCOME, THE_SCHOOL_HUB_RUNNING, v1, REDIS_RUNNING } = constants;
const { notFoundApi } = genericErrors;

const appConfig = (app) => {
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(helmet());
  app.use(cors());
  app.use(json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    } }));
  app.use(compression());
  app.use(urlencoded({ extended: true }));
  app.use(expressFileUpload({ useTempFiles: true }));
  app.get('/', (req, res) => successResponse(res, { message: WELCOME }));
  app.use(v1, apiV1Routes);
  app.use((req, res, next) => {
    next(notFoundApi);
  });
  app.use((err, req, res, next) => errorResponse(req, res, err));
  redisDB.on('connect', () => logger.info(REDIS_RUNNING));
  const port = config.PORT || 3249;
  app.listen(port, () => {
    logger.info(`${THE_SCHOOL_HUB_RUNNING} ${port}`);
  });
};

export default appConfig;
