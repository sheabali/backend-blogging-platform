import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registered successfully.',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
