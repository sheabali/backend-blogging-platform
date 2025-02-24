import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const createUserIntoDB = async (payload: TUser) => {
  // create a user object
  const result = await User.create(payload);

  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExists(payload?.email);
  console.log(user);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched!');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user.email,
    role: user?.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10d',
  );

  return {
    token,
  };
};

export const AuthServices = {
  loginUser,
  createUserIntoDB,
};
