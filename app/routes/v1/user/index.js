import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares';
import {
  UserController,
  SchoolController
} from '../../../controllers';

const router = Router();

const { authenticate } = AuthMiddleware;

const { fetchUserById } = UserController;

router.use(authenticate);

router.get('/schools', SchoolController.getSchoolsByUserId);

router.get('/:id', fetchUserById);

export default router;
