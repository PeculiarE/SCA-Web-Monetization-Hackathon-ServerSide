import db from '../../db';
import { userQueries } from '../../db/queries';

const { findUserByEmail } = userQueries;

/**
 * Contains a collection of service methods for managing User resource on the app.
 * @class UserService
 *
 */
class UserService {
  /**
   * Fetches a User by email
   * @memberof UserService
   * @param email - user email
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async getUserByEmail(email) {
    return db.one(findUserByEmail, [email]);
  }
}

export default UserService;
