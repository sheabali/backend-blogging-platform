import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { blogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog, email: string) => {
  const user = await User.isUserExists(email);
  payload.author = user?._id as Types.ObjectId;
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const BlogQuery = new QueryBuilder(Blog.find(), query)
    .search(blogSearchableFields)
    .filter()
    .sort();

  const result = await BlogQuery.modelQuery;

  return result;
};
const updateBlogIntoDB = async (
  id: string,
  updateData: Partial<TBlog>,
  email: string,
) => {
  const user = await User.findOne({ email }).select('-password');

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog Not Found!');
  }

  if (!blog.author.equals(user?._id)) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to update this blog.',
    );
  }

  const result = await Blog.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};
const deleteBlogIntoDB = async (id: string, email: string) => {
  const user = await User.findOne({ email }).select('-password');

  const blog = await Blog.findById(id);

  console.log('id', id, { blog });

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog Not Found!');
  }

  if (!blog.author.equals(user?._id)) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to delete this blog.',
    );
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  getAllBlogFromDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
