import { Router } from 'express';
import { SchoolController } from '../../../controllers';
import { ValidationMiddleware, AuthMiddleware } from '../../../middlewares';
import { schoolSchema, schoolReviewSchema } from '../../../validations';

const router = Router();
const { validate } = ValidationMiddleware;
const { addNewSchool, fetchSchools, getSchoolInfo } = SchoolController;
const { addSchoolReview, getSchoolReviews } = SchoolController;

const { authenticate } = AuthMiddleware;

router.post('/:schoolId/review', validate(schoolReviewSchema), addSchoolReview);
router.get('/', fetchSchools);

router.get('/:schoolId', getSchoolInfo);
router.get('/:schoolId/review', getSchoolReviews);

router.use(authenticate);

router.post(
  '/',
  validate(schoolSchema),
  addNewSchool
);

export default router;
