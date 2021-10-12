import { S3 as _S3 } from 'aws-sdk';
import config from '../env';

const { THE_SCHOOL_HUB_SECRET_ACCESS_KEY,
  THE_SCHOOL_HUB_AWS_BUCKET_NAME, THE_SCHOOL_HUB_ACCESS_KEY_ID } = config;
const S3 = new _S3({
  accessKeyId: THE_SCHOOL_HUB_ACCESS_KEY_ID,
  secretAccessKey: THE_SCHOOL_HUB_SECRET_ACCESS_KEY,
  ACL: 'public-read'
});

export default { THE_SCHOOL_HUB_AWS_BUCKET_NAME, S3 };
