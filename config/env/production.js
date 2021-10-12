import 'dotenv/config';

export default {
  DATABASE_URL: process.env.THE_SCHOOL_HUB_DATABASE_URL || process.env.DATABASE_URL
};
