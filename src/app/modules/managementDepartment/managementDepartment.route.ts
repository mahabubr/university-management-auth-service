import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { ENUM_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  ManagementDepartmentController.createDepartment
);

router.get('/:id', auth(
  ENUM_ROLE.SUPER_ADMIN,
  ENUM_ROLE.ADMIN,
  ENUM_ROLE.FACULTY,
  ENUM_ROLE.STUDENT
),ManagementDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  ManagementDepartmentController.updateDepartment
);

router.delete('/:id',  auth(ENUM_ROLE.SUPER_ADMIN),
ManagementDepartmentController.deleteDepartment);

router.get('/', auth(
  ENUM_ROLE.SUPER_ADMIN,
  ENUM_ROLE.ADMIN,
  ENUM_ROLE.FACULTY,
  ENUM_ROLE.STUDENT
),ManagementDepartmentController.getAllDepartments);

export const ManagementDepartmentRoutes = router;
