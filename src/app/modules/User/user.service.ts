import { TUser } from './user.interface';

const createUserIntoDB = async (payload: TUser) => {
  console.log(payload);
};

export const UserServices = {
  createUserIntoDB,
};
