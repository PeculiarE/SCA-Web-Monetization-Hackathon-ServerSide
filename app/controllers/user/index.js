import { helpers, DBError } from '../../utils';
import { UserService } from '../../services';

const {
  GenericHelper: { successResponse, moduleErrLogMessager, getEntity },
  ErrorFactory: { resolveError },
} = helpers;
const { getUserById } = UserService;
/**
 * controllers that contains methods for users
 * @class UserController
 */
class UserController {
  /**
   * fetches a user
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param { Function } next - Calls the next handler.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof UserController
   */
  static async fetchUserById(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await getEntity(
        `user:${userId}`,
        getUserById,
        userId
      );
      successResponse(res, {
        message: 'User fetched successfully',
        user
      });
    } catch (e) {
      moduleErrLogMessager(
        new DBError({
          message: e.message,
          status: 'GET_USER_BY_ID_ERROR'
        })
      );
      next(resolveError({ ...e, resource: 'User' }));
    }
  }
}

export default UserController;
