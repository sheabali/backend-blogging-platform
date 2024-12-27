import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';

const blockUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate({ id }, { isBlocked: true });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found!');
  }
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await Blog.findByIdAndUpdate(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog Not Found!');
  }

  return result;
};

export const AdminServices = {
  blockUserIntoDB,
  deleteUserFromDB,
};
