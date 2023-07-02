/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JWTHelpers } from '../../../helpers/jwtHelper';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  // const user = new User();

  const { id, password } = payload;

  //check user exist
  // const isUserExist = await User.findOne({id}, {id:1, password: 1, needsPasswordChange: 1}).lean()
  // const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Match password
  // const isPasswordMatch = await bcrypt.compare(password, isUserExist?.password)

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // Create access Token & Refresh token

  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = JWTHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JWTHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token

  let verifyToken = null;

  try {
    verifyToken = JWTHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { userId } = verifyToken;

  // checking deleted user refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new token
  const newAccessToken = JWTHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword  = async (user: JwtPayload | null, payload: IChangePassword) :Promise<void>=>{
  const {newPassword, oldPassword} = payload

  // check user exist
  const isUserExist = await User.isUserExist(user?.userId)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // check old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  // hash password before saving
  const newHashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds))

  const updatedData = {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date()
  }

  // update password
  await User.findOneAndUpdate({id: user?.userId}, updatedData)

}

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword
};
