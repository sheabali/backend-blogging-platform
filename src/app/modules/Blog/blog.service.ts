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
  if (user?.role !== 'user') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to create a blog',
    );
  }
  const createdBlog = await Blog.create(payload);
  const result = await Blog.findById(createdBlog._id)
    .select('-__v')
    .populate('author');
  return result;
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().select('-__v').populate('author'),
    query,
  )
    .search(blogSearchableFields)
    .sort()
    .filter();

  const result = await blogQuery.modelQuery;

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
  ).populate('author');

  return result;
};
const deleteBlogIntoDB = async (id: string, email: string) => {
  const user = await User.findOne({ email }).select('-password');

  const blog = await Blog.findById(id);

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
