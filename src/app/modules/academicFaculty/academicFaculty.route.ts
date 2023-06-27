import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middleware/validateRequest';
import { ENUM_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  AcademicFacultyController.createFaculty
);

router.get(
  '/:id',
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.FACULTY, ENUM_ROLE.STUDENT),
  AcademicFacultyController.getSingleFaculty
);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.FACULTY, ENUM_ROLE.SUPER_ADMIN),
  AcademicFacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteFaculty
);

router.get(
  '/',
  auth(
    ENUM_ROLE.ADMIN,
    ENUM_ROLE.FACULTY,
    ENUM_ROLE.STUDENT,
    ENUM_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.getAllFaculties
);

export const AcademicFacultyRoutes = router;
