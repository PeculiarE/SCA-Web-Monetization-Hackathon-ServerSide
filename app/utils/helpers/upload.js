import { nanoid } from 'nanoid';
import sharp from 'sharp';
import fs from 'fs';
import { extname } from 'path';
import AWS from '../../../config/aws/s3';

const { THE_SCHOOL_HUB_AWS_BUCKET_NAME, S3 } = AWS;

/**
 * contains upload helpers
 *
 * @class UploadHelper
 */
export default class UploadHelper {
  /**
   * @memberof UploadHelper
   * @param {file} file - The path name to the file
   * @returns { Promise<Object | Error> } - it returns an object if everything is fine and otherwise
   */
  static async upload(file, name, mimetype) {
    const ext = extname(name);
    let content = fs.readFileSync(file);
    let fileName = `${nanoid(32)}.${ext}`;
    if (['image/jpeg', 'image/png'].includes(mimetype)) {
      content = await sharp(content)
        .webp({ quality: 20 })
        .toBuffer();
      fileName = `${nanoid(32)}.webp`;
    }
    const params = {
      Bucket: THE_SCHOOL_HUB_AWS_BUCKET_NAME,
      Key: fileName,
      Body: content,
      ContentType: mimetype,
      ACL: 'public-read'
    };
    return S3.upload(params).promise();
  }

  /**
   * @param {file} file - The file to be uploaded;
   * @param {limit} limit - Limit set for the file
   * @returns {Boolean} - Boolean
   * @memberof UploadHelper
   */
  static isFileSizeOverLimit(file, limit) {
    return file.size > limit;
  }

  /**
   * Check for filesType type
   *
   * @param {File} file - The file to be uploaded;
   * @param {String[]} allowedTypes - List of valid file types
   * @memberof UploadHelper
   * @returns { Boolean } -  It returns true or false.
   */
  static isFileTypeIsAllowed(file, allowedTypes) {
    return allowedTypes.includes(file.mimetype);
  }
}
