import { Router } from 'express';
import { PublicController } from '../../../controllers';
import { UploadMiddleware, ValidationMiddleware } from '../../../middlewares';

const router = Router();
const { uploadFile, checkIfFileSizeOverLimit, checkIfFileTypeIsAllowed } = UploadMiddleware;
const { validateFile } = ValidationMiddleware;
const { uploadMedia } = PublicController;

router.post(
  '/upload',
  validateFile,
  checkIfFileTypeIsAllowed,
  checkIfFileSizeOverLimit,
  uploadFile,
  uploadMedia
);

export default router;
