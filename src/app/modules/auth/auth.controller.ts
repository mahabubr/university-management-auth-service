import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(res);
});

export const AuthController = {
  loginUser,
};
