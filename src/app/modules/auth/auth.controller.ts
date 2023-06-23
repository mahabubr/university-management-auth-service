import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.sevices';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthServices.loginUser(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
