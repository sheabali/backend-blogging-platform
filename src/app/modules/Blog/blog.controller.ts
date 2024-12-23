import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlog(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog create succesfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
};
