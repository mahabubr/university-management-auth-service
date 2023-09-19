import express from 'express';
import { ENUM_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

// Student

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  UserController.createStudent
);

// Faculty

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  UserController.createFaculty
);

// Admin

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  UserController.createAdmin
);

export const UserRoutes = router;
