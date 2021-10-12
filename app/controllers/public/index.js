import { helpers, constants } from '../../utils';

const {
  GenericHelper: { successResponse },
} = helpers;

const {
  FILE_UPLOAD_SUCCESS
} = constants;

/**
 * controllers that contains methods for generic resources
 * @class PublicController
 */
export default class PublicController {
  /**
   * upload files to s3
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response containing the details of the uploaded resource
   * @memberof PublicController
   */
  static async uploadMedia(req, res) {
    return successResponse(res, {
      message: FILE_UPLOAD_SUCCESS,
      data: { url: req.image }
    });
  }
}
