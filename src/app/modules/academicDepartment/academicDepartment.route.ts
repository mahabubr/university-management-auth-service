import express from 'express';
import { ENUM_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  AcademicDepartmentController.updateDepartment
);

router.delete('/:id',  auth(ENUM_ROLE.SUPER_ADMIN),
AcademicDepartmentController.deleteDepartment);

router.get('/', AcademicDepartmentController.getAllDepartments);

export const AcademicDepartmentRoutes = router;
