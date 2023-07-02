import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middleware/auth';
import { ENUM_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.FACULTY, ENUM_ROLE.STUDENT, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);



export const AuthRoutes = router;
