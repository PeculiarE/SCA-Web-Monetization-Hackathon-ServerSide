import { nanoid } from 'nanoid';
import genericError from '../errors/generic';
import constants from '../constants';
import DBError from '../errors/db.error';
import db, { redisDB } from '../../db';

const { serverError } = genericError;
const { FAIL, SUCCESS, SUCCESS_RESPONSE } = constants;
/**
 *Contains GenericHelper methods
 * @class GenericHelper
 */
class GenericHelper {
  /**
   * It generates a uniqueId.
   * @static
   * @memberof GenericHelper
   * @returns {String} - A unique string.
   */
  static generateId(length) {
    return nanoid(length);
  }

  /**
   * It finds user ip address.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @memberof GenericHelper
   * @returns {String}  string.
   */
  static findUserIpAddress(req) {
    return req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;
  }

  /**
   * Creates DB Error object and logs it with respective error message and status.
   * @static
   * @param { String | Object } data - The data.
   * @memberof GenericHelper
   * @returns { Object } - It returns an Error Object.
   */
  static makeError({ error, status }) {
    const dbError = new DBError({
      status,
      message: error.message
    });
    GenericHelper.moduleErrLogMessager(dbError);
    return dbError;
  }

  /**
   * Generates a JSON response for success scenarios.
   * @static
   * @param {Response} res - Response object.
   * @param {object} options - An object containing response properties.
   * @param {object} options.data - The payload.
   * @param {string} options.message -  HTTP Status code.
   * @param {number} options.code -  HTTP Status code.
   * @memberof GenericHelpers
   * @returns {JSON} - A JSON success response.
   */
  static successResponse(
    res,
    { data, message = SUCCESS_RESPONSE, code = 200 }
  ) {
    return res.status(code).json({
      status: SUCCESS,
      message,
      data
    });
  }

  /**
   * Generates a JSON response for failure scenarios.
   * @static
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @param {object} error - The error object.
   * @param {number} error.status -  HTTP Status code, default is 500.
   * @param {string} error.message -  Error message.
   * @param {object|array} error.errors -  A collection of  error message.
   * @memberof GenericHelpers
   * @returns {JSON} - A JSON failure response.
   */
  static errorResponse(req, res, error) {
    const aggregateError = { ...serverError, ...error };
    GenericHelper.apiErrLogMessager(aggregateError, req);
    return res.status(aggregateError.status).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors
    });
  }

  /**
   * Generates log for module errors.
   * @static
   * @param {object} error - The module error object.
   * @memberof GenericHelpers
   * @returns { Null } -  It returns null.
   */
  static moduleErrLogMessager(error, status) {
    return logger.error(`${status || error.status} - ${error.name} - ${error.message}`);
  }

  /**
   * Generates log for api errors.
   * @static
   * @private
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof GenericHelpers
   * @returns {String} - It returns null.
   */
  static apiErrLogMessager(error, req) {
    logger.error(
      `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }

  /**
   * Fetches a pagination collection of a resource.
   * @static
   * @param {Object} options - configuration options.
   * @param {number} options.page - Current page e.g: 1 represents first
   * 30 records by default and 2 represents the next 30 records.
   * @param {string} options.limit - Max number of records.
   * @param {number} options.getCount - Max number of records.
   * @param {number} options.getResources - Max records in the current page
   * @param {Array} options.params - Extra parameters for the get resources query.
   * @param {Array} options.countParams - Extra parameters for the get count query.
   * @memberof GenericHelper
   * @returns {Promise} - Returns a promise array of the count and the resources
   */
  static async fetchResourceByPage({
    page,
    limit,
    getCount,
    getResources,
    params = [],
    countParams = []
  }) {
    const offSet = limit === 'none' ? 0 : (+page - 1) * +limit;
    const max = limit === 'none' ? null : +limit;
    const fetchCount = db.one(getCount, [...countParams]);
    const fetchCountResource = db.any(getResources, [
      offSet,
      max,
      ...params
    ]);
    return Promise.all([fetchCount, fetchCountResource]);
  }

  /**
   * calculate number of pages
   * @static
   * @param { Number } total - Total number of a particular resource.
   * @param { Number } limit - The total number of resource to be displayed per page
   * @memberof GenericHelper
   * @returns { Number } - Returns the display page value.
   */
  static calcPages(total, limit) {
    const displayPage = Math.floor(total / +limit);
    return total % +limit ? displayPage + 1 : displayPage;
  }

  /**
   * validates an input based on a schema
   * @static
   * @param { Joi } schema - The validation schema.
   * @param { Object } object - The data to be validated
   * @memberof GenericHelper
   * @returns { boolean }
   */
  static async validateInput(schema, object) {
    return schema.validateAsync(object);
  }

  /**
   * converts a string to lower case
   * @static
   * @param { String } word The word to be converted.
   * @memberof GenericHelper
   * @returns { String } Returns the word in lower case.
   */
  static convertCase(word) {
    return word.toLowerCase();
  }

  /**
   * check if entity is stored in Redis, returns it if true
   * or checks the main database if false
   * @static
   * @param { String } key - The key of the entity stored in Redis
   * @param { fn  } fn - Service that fetches entity from the main database
   * @param { String } id - Entity id
   * @memberof GenericHelper
   * @returns { String } Returns the estimated time of reading a string
   */
  static async getEntity(key, fn, id) {
    const savedEntity = await redisDB.get(key);
    if (savedEntity) return JSON.parse(savedEntity);
    const data = await fn(id);
    await redisDB.set(key, JSON.stringify(data));
    return data;
  }
}

export default GenericHelper;
