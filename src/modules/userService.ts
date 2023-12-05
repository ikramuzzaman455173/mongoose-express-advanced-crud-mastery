import { TUser } from './user.interfase';
import { UserModel } from './user.model';

// create or user post service
const createUserIntoDB = async (userData: TUser) => {
  const result = await UserModel.find(userData);
  return result;
};
export const userService = { createUserIntoDB };
