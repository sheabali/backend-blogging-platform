import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  console.log('user', req.user);
  const { email } = req.user;
  const result = await BlogService.createBlogIntoDB(req.body, email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog create successfully.',
    data: result,
  });
});

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllBlogFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog are retrieved successfully.',
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.user;

  const result = await BlogService.updateBlogIntoDB(id, req.body, email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully.',
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.user;
  await BlogService.deleteBlogIntoDB(id, email);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
