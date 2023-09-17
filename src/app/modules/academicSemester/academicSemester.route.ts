import express from 'express';
import { ENUM_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  AcademicSemesterController.createAcademicSemester
);
router.get(
  '/:id',
  auth(
    ENUM_ROLE.SUPER_ADMIN,
    ENUM_ROLE.ADMIN,
    ENUM_ROLE.FACULTY,
    ENUM_ROLE.STUDENT
  ),
  AcademicSemesterController.getSingleSemester
);
router.get(
  '/',
  // auth(
  //   ENUM_ROLE.SUPER_ADMIN,
  //   ENUM_ROLE.ADMIN,
  //   ENUM_ROLE.FACULTY,
  //   ENUM_ROLE.STUDENT
  // ),
  AcademicSemesterController.getAllSemesters
);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  AcademicSemesterController.updateSemester
);
router.delete(
  '/:id',
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  AcademicSemesterController.deleteSemester
);

export const AcademicSemesterRoute = router;
