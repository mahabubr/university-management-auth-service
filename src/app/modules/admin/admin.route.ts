import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import auth from '../../middleware/auth';
import { ENUM_ROLE } from '../../../enums/user';
const router = express.Router();

router.get('/:id',  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
AdminController.getSingleAdmin);
router.get('/',  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
AdminController.getAllAdmins);

router.delete('/:id',  auth(ENUM_ROLE.SUPER_ADMIN),
AdminController.deleteAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  AdminController.updateAdmin
);

export const AdminRoutes = router;
