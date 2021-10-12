import { redisDB } from '../../db';
import { SchoolModel, SchoolReviewModel } from '../../models';
import { SchoolService } from '../../services';
import { helpers, DBError, constants } from '../../utils';

const {
  ErrorFactory: { resolveError },
  GenericHelper: { successResponse, moduleErrLogMessager, getEntity }
} = helpers;

const { RESOURCE_FETCH_SUCCESS, RESOURCE_FETCH_ERROR_STATUS,
  RESOURCE_CREATE_SUCCESS } = constants;

const { getSchoolById, getSchoolsPerUser,
  getReviewBySchoolId, getSchools } = SchoolService;

/**
 * controllers that contains methods for school resources
 * @class SchoolController
 */
export default class SchoolController {
  /**
   * add a new sch to the db
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response containing the details of the school
   * @memberof SchoolController
   */
  static async addNewSchool(req, res, next) {
    try {
      const school = new SchoolModel({ ...req.body, userId: req.data.id });
      const { slug, id } = await school.save();
      successResponse(res, {
        message: 'School added successfully',
        data: {
          id,
          slug,
          ...req.body
        },
        code: 201
      });
    } catch (e) {
      moduleErrLogMessager(
        new DBError({
          message: e.message,
          status: 'CREATE_SCHOOL_ERROR'
        })
      );
      next(resolveError(e));
    }
  }

  /**
  * fetch schools
  * @static
  * @param {Request} req - The request from the endpoint.
  * @param {Response} res - The response returned by the method.
  * @param { Function } next - Calls the next handler.
  * @returns { JSON } A JSON response containing the details of the school
  * @memberof SchoolController
  */
  static async fetchSchools(req, res, next) {
    try {
      const schools = await getSchools(req.query);
      successResponse(res, {
        message: RESOURCE_FETCH_SUCCESS('Schools'),
        data: schools
      });
    } catch (e) {
      moduleErrLogMessager(
        new DBError({
          message: e.message,
          status: RESOURCE_FETCH_ERROR_STATUS('SCHOOLS')
        })
      );
      next(resolveError(e));
    }
  }

  /**
   * get school by id
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response containing the details of the school
   * @memberof SchoolController
   */
  // eslint-disable-next-line max-lines-per-function
  static async getSchoolInfo(req, res, next) {
    try {
      const { schoolId } = req.params;
      const school = await getEntity(
        `school:${schoolId}`,
        getSchoolById,
        schoolId
      );
      successResponse(res, {
        message: 'School info retrieved successfully',
        data: school
      });
    } catch (e) {
      moduleErrLogMessager(
        new DBError({
          message: e.message,
          status: 'GET_SCHOOL_ERROR'
        })
      );
      next(resolveError({ ...e, resource: 'School' }));
    }
  }

  /**
   * get schools by userId
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response containing the details of the school
   * @memberof SchoolController
   */
  static async getSchoolsByUserId(req, res, next) {
    try {
      const data = await getSchoolsPerUser(req.query, req.data.id);
      successResponse(res, {
        message: RESOURCE_FETCH_SUCCESS('Schools'),
        data
      });
    } catch (e) {
      moduleErrLogMessager(
        new DBError({
          message: e.message,
          status: RESOURCE_FETCH_ERROR_STATUS('SCHOOLS')
        })
      );
      next(resolveError({ ...e, resource: 'Schools' }));
    }
  }

  /**
   * adds a new school review to the db or updates an existing review
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response containing the details of the school
   * @memberof SchoolAnalyticsController
   */
  static async addSchoolReview(req, res, next) {
    try {
      const reviewerId = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
      const { body, params: { schoolId } } = req;
      const schoolReview = new SchoolReviewModel({
        ...body,
        reviewerId,
        schoolId
      });
      const { reviewId } = await schoolReview.save();
      // eslint-disable-next-line no-console
      console.log('ADD', reviewId);
      await redisDB.del(`school:${schoolId}`);
      successResponse(res, {
        message: RESOURCE_CREATE_SUCCESS('Review'),
        data: { reviewId, ...body },
        code: 201
      });
    } catch (e) {
      moduleErrLogMessager(
        new DBError({
          message: e.message,
          status: 'REVIEW_SCHOOL_ERROR'
        })
      );
      next(resolveError({ ...e, resource: 'Review' }));
    }
  }

  /**
   * get all the reviews for a school
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response containing the details of the school
   * @memberof SchoolAnalyticsController
   */
  static async getSchoolReviews(req, res, next) {
    try {
      const { schoolId } = req.params;
      const data = await getReviewBySchoolId(schoolId, req.query);
      successResponse(res, {
        message: 'School reviews retrieved successfully',
        data
      });
    } catch (e) {
      moduleErrLogMessager(
        new DBError({
          message: e.message,
          status: 'GET_SCHOOL_REVIEWS_ERROR'
        })
      );
      next(resolveError(e));
    }
  }
}
