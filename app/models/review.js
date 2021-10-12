import db from '../db';
import { schoolQueries } from '../db/queries';
import { helpers } from '../utils';

const { saveSchoolReview } = schoolQueries;
const { GenericHelper: { generateId } } = helpers;

/**
 * @class SchoolReviewModel
 */
class SchoolReviewModel {
  /**
   * This is a constructor for creating an instance of a review for a school.
   * @param { Object } options - contains the required properties for adding a review
   * for a school.
   * @returns { SchoolReviewModel } - An instance of the school review details.
   * @constructor SchoolReviewModel
   */
  constructor(options) {
    this.id = generateId();
    this.subject = options.subject;
    this.message = options.message;
    this.reviewer_id = options.reviewerId;
    this.school_id = options.schoolId;
    this.reviewer_name = options.reviewerName;
    this.rating = options.rating;
  }

  /**
   * Persists a new school review to the DB.
   * @memberof SchoolReviewModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a school review details object or a DB Error.
   */
  async save() {
    return db.one(saveSchoolReview, [
      this.id,
      this.subject,
      this.message,
      this.reviewer_id,
      this.school_id,
      this.reviewer_name,
      this.rating
    ]);
  }
}

export default SchoolReviewModel;
