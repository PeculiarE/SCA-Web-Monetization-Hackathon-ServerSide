import rootPath from 'app-root-path';
import development from './development';
import test from './test';
import production from './production';

const {
  PORT,
  THE_SCHOOL_HUB_SECRET: SECRET,
  THE_SCHOOL_HUB_REFRESH_SECRET: REFRESH_SECRET,
  THE_SCHOOL_HUB_NODE_ENV: NODE_ENV
} = process.env;

const currentEnv = {
  development,
  test,
  production
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  SECRET,
  REFRESH_SECRET,
  NODE_ENV
};
