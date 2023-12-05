import { TUser } from './user.interfase';
import { UserModel } from './user.model';

// create or user post service
const createUserIntoDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

// users find service
const getAllUsersIntoDB = async () => {
  const projection = {
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  };
  const result = await UserModel.find({}, projection);
  return result;
};
export const userService = { createUserIntoDB, getAllUsersIntoDB };

