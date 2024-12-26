import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlogIntoDB(req.body);
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

  console.log('data', id);
  const result = await BlogService.updateBlogIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully.',
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlogIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog delete successfully.',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
