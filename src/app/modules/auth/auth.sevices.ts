import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
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

  // Create access Token

  return {};
};

export const AuthServices = {
  loginUser,
};
