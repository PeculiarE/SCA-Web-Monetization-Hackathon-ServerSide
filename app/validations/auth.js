import Joi from 'joi';
import { helpers } from '../utils';

const { ValidationHelper: { stringCheck, emailCheck,
  passwordCheck, phoneNumberCheck, editStringCheck } } = helpers;

export const signUpSchema = Joi.object({
  firstName: stringCheck('First name', 2),
  lastName: stringCheck('Last name', 2),
  email: emailCheck(),
  password: passwordCheck(),
  phoneNumber: phoneNumberCheck(),
  paymentPointer: editStringCheck('Payment pointer')
});

export const signInSchema = Joi.object({
  email: emailCheck(),
  password: passwordCheck()
});
