import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const updateBlogIntoDB = async (id: string, updateData: Partial<TBlog>) => {
  // console.log('update', payload);

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
const deleteBlogIntoDB = async (_id: string) => {
  const result = await Blog.deleteOne({ _id });

  return result;
};

export const BlogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
