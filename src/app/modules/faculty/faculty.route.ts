import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
import auth from '../../middleware/auth';
import { ENUM_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/:id',auth(
  ENUM_ROLE.SUPER_ADMIN,
  ENUM_ROLE.ADMIN,
  ENUM_ROLE.FACULTY
), FacultyController.getSingleFaculty);
router.get('/', auth(
  ENUM_ROLE.SUPER_ADMIN,
  ENUM_ROLE.ADMIN,
  ENUM_ROLE.FACULTY
),FacultyController.getAllFaculties);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),

  FacultyController.updateFaculty
);

router.delete('/:id',  auth(ENUM_ROLE.SUPER_ADMIN),
FacultyController.deleteFaculty);

export const FacultyRoutes = router;
