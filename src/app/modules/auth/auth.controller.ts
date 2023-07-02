import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.sevices';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthServices.loginUser(loginData);

  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  // delete result.refreshToken;
  // if ('refreshToken' in result) {
  //   delete result.refreshToken;
  // }

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  });
});


const changePassword = catchAsync(async (req: Request, res: Response) => {

  const user  = req.user
  const { ...passwordData } = req.body;

  await AuthServices.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: "Password change successfully",
  });
});


export const AuthController = {
  loginUser,
  refreshToken,
  changePassword
};
