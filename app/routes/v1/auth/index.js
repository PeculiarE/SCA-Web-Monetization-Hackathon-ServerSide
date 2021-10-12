import { Router } from 'express';
import { ValidationMiddleware, AuthMiddleware } from '../../../middlewares';
import { signUpSchema, signInSchema } from '../../../validations';
import { AuthController } from '../../../controllers';

const router = Router();
const { validate } = ValidationMiddleware;
const { createUser, loginUser } = AuthController;
const { loginUserEmailValidator, comparePassword } = AuthMiddleware;

router.post(
  '/signup',
  validate(signUpSchema),
  createUser
);

router.post(
  '/signin',
  validate(signInSchema),
  loginUserEmailValidator,
  comparePassword,
  loginUser
);

export default router;
