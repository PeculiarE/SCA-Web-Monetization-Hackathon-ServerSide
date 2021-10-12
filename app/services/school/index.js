/* eslint-disable max-lines */
import db from '../../db';
import { schoolQueries } from '../../db/queries';
import { helpers } from '../../utils';

const { getSchoolInfo, getAllSchools, getTotalNumberOfSchools,
  fetchSchoolReview, countSchoolReviews, fetchSingleUserSchools,
  fetchTotalNumberOfSingleUserSchools } = schoolQueries;
const { GenericHelper: { fetchResourceByPage, calcPages } } = helpers;

/**
 * Contains a collection of service methods for managing School resource on the app.
 * @class SchoolService
 */
class SchoolService {
  /**
   * fetches a school by id
   * @memberof SchoolService
   * @param {String} id - School id
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Array of the School resource or a DB Error.
  */
  static async getSchoolById(id) {
    return db.one(getSchoolInfo, [id]);
  }

  /** Gets all schools in pages
   * @memberof SchoolService
   * @param {Object} page - The current page
   * @param {Object} limit - The max number of schools to be shown on the page
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the school resource or a DB Error.
  */
  static async getSchools({ page = 1, limit = 10 }) {
    const [{ count }, schools] = await fetchResourceByPage({
      page,
      limit,
      getCount: getTotalNumberOfSchools,
      getResources: getAllSchools
    });
    return {
      total: count,
      currentPage: page,
      totalPages: calcPages(count, limit),
      schools
    };
  }

  /**
   * fetches a reviews by schoolId
   * @memberof SchoolService
   * @param {String} schoolId school id
   * @param {Object} page - The current page
   * @param {Object} limit - The max number of reviews to be shown on the page
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the School review resource or a DB Error.
  */
  static async getReviewBySchoolId(schoolId, { page = 1, limit = 5 }) {
    const [{ count }, reviews] = await fetchResourceByPage({
      page,
      limit,
      getCount: countSchoolReviews,
      getResources: fetchSchoolReview,
      params: [schoolId],
      countParams: [schoolId]
    });
    return {
      total: count,
      currentPage: page,
      totalPages: calcPages(count, limit),
      reviews
    };
  }

  /** Gets all schools for a user in pages
   * @memberof SchoolService
   * @param {Object} page - The current page
   * @param {Object} limit - The max number of schools to be shown on the page
   * @param {String} userId - The user id
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the school resource or a DB Error.
  */
  static async getSchoolsPerUser({ page = 1, limit = 10 }, userId) {
    const [{ count }, schools] = await fetchResourceByPage({
      page,
      limit,
      getCount: fetchTotalNumberOfSingleUserSchools,
      getResources: fetchSingleUserSchools,
      params: [userId],
      countParams: [userId]
    });
    return {
      total: count,
      currentPage: page,
      totalPages: calcPages(count, limit),
      schools
    };
  }
}

export default SchoolService;
