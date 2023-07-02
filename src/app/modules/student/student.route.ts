import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
import auth from '../../middleware/auth';
import { ENUM_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/',auth(
  ENUM_ROLE.SUPER_ADMIN,
  ENUM_ROLE.ADMIN,
  ENUM_ROLE.FACULTY,
  ENUM_ROLE.STUDENT
), StudentController.getAllStudents);
router.get('/:id',auth(
  ENUM_ROLE.SUPER_ADMIN,
  ENUM_ROLE.ADMIN,
  ENUM_ROLE.FACULTY,
  ENUM_ROLE.STUDENT
), StudentController.getSingleStudent);
router.delete('/:id',  auth(ENUM_ROLE.SUPER_ADMIN),
StudentController.deleteStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  StudentController.updateStudent
);

export const StudentRoutes = router;
