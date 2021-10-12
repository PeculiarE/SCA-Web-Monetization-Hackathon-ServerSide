import Joi from 'joi';
import { helpers, constants } from '../utils';

const { ValidationHelper } = helpers;
const { SCH_CATEGORY } = constants;

const {
  stringCheck,
  emailCheck,
  enumCheck,
  editStringCheck,
  editNumberCheck
} = ValidationHelper;

export const schoolSchema = Joi.object({
  name: stringCheck('School name'),
  category: enumCheck(SCH_CATEGORY, 'School category'),
  aboutUs: stringCheck('About us'),
  address: stringCheck('School address'),
  email: emailCheck(),
  phoneNumber: editStringCheck('Phone number', 11),
  country: editStringCheck('Country'),
  state: editStringCheck('State'),
  banner: stringCheck('Banner'),
  website: editStringCheck('Website'),
  curriculum: editStringCheck('Curriculum'),
  studentPopulation: editNumberCheck('Student population'),
  teachingStaff: editNumberCheck('Teaching staff'),
  nonTeachingStaff: editNumberCheck('Non-teaching staff'),
  facilities: editStringCheck('Facilities'),
  admissionRequirements: editStringCheck('Admission requirements'),
  schoolFeesRange: stringCheck('School fees range'),
});

export const schoolReviewSchema = Joi.object({
  reviewerName: stringCheck('Reviewer name', 3),
  subject: stringCheck('Subject'),
  message: stringCheck('Message'),
  rating: editNumberCheck('Rating', 1, 5)
});
