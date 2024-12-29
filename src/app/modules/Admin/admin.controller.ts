import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  console.log('userID', userId);
  await AdminServices.blockUserIntoDB(userId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminServices.deleteUserFromDB(id);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
