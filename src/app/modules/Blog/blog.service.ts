import QueryBuilder from '../../builder/QueryBuilder';
import { blogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const BlogQuery = new QueryBuilder(Blog.find(), query)
    .search(blogSearchableFields)
    .sort()
    .filter();

  const result = await BlogQuery.modelQuery;
  console.log(BlogQuery);
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
  getAllBlogFromDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
