import { UserModel } from '../../models';
import { helpers, constants, DBError } from '../../utils';

const {
  SIGNUP_SUCCESSFUL,
  RESOURCE_CREATE_ERROR_STATUS,
  LOGIN_SUCCESSFUL,
  SIGNIN_ERROR,
} = constants;
const {
  AuthHelper: { hashString, addTokenToData },
  GenericHelper: { successResponse, moduleErrLogMessager },
  ErrorFactory: { resolveError },
} = helpers;

/**
 * @class AuthController
 */
class AuthController {
  /**
   * adds new user
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof AuthController
   */
  static async createUser(req, res, next) {
    try {
      const { password } = req.body;
      const { salt, hash } = hashString(password);
      const user = await new UserModel({ ...req.body, password: hash, salt });
      await user.save();
      successResponse(res, {
        code: 201,
        message: SIGNUP_SUCCESSFUL,
      });
    } catch (e) {
      const error = resolveError(e);
      const dbError = new DBError({
        status: RESOURCE_CREATE_ERROR_STATUS('USER'),
        message: e.message
      });
      moduleErrLogMessager(dbError);
      next(error);
    }
  }

  /**
   * logs in user
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof AuthController
   */
  static async loginUser(req, res, next) {
    try {
      const { id, firstName, lastName, email, paymentPointer } = req.user;
      const { token, refreshToken } = addTokenToData({
        id,
        firstName,
        lastName,
        email,
        paymentPointer
      });
      const data = { ...req.user, token, refreshToken };
      successResponse(res, {
        message: LOGIN_SUCCESSFUL('User'),
        data
      });
    } catch (e) {
      const error = resolveError(e);
      const dbError = new DBError({
        status: SIGNIN_ERROR('User'),
        message: e.message
      });
      moduleErrLogMessager(dbError);
      next(error);
    }
  }
}

export default AuthController;
