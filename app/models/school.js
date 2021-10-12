/* eslint-disable max-lines-per-function */
import { schoolQueries } from '../db/queries';
import db from '../db';
import { helpers } from '../utils';

const { createSchool } = schoolQueries;
const {
  GenericHelper: { generateId }
} = helpers;

/**
 * @class SchoolModel
 */
class SchoolModel {
  /**
   * This is a constructor for creating an instance of an School.
   * @param { Object } data - contains the required properties for creating
   * the School.
   * @returns { SchoolModel } - An instance of the School profile.
   * @constructor SchoolModel
   */
  constructor(data) {
    this.id = generateId();
    this.name = data.name;
    this.category = data.category;
    this.about_us = data.aboutUs;
    this.address = data.address;
    this.email = data.email;
    this.phone_number = data.phoneNumber;
    this.country = data.country;
    this.state = data.state;
    this.website = data.website;
    this.banner = data.banner;
    this.student_population = data.studentPopulation;
    this.teaching_staff = data.teachingStaff;
    this.non_teaching_staff = data.nonTeachingStaff;
    this.created_by = data.userId;
    this.curriculum = data.curriculum;
    this.facilities = data.facilities;
    this.admission_requirements = data.admissionRequirements;
    this.school_fees_range = data.schoolFeesRange;
  }

  /**
   * Persists a School to the DB.
   * @memberof SchoolModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an School object or a DB Error.
   */
  async save() {
    return db.one(createSchool, [
      this.id,
      this.name,
      this.category,
      this.about_us,
      this.address,
      this.email,
      this.phone_number,
      this.country,
      this.state,
      this.created_by,
      this.website,
      this.banner,
      this.student_population,
      this.teaching_staff,
      this.non_teaching_staff,
      this.curriculum,
      this.facilities,
      this.admission_requirements,
      this.school_fees_range
    ]);
  }
}

export default SchoolModel;
