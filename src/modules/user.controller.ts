import { Request, Response } from 'express';
import { userService } from './userService';
import UserValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    // userData validation in ZOD
    const zodParseData = UserValidationSchema.parse(userData);
    const result = await userService.createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    // console.log(`Something went wrong: ${error}`);
    res.status(404).json({
      success: false,
      // message: error.message || 'Something went to wrong!',
      message: 'Something went to wrong!',
      error: error,
    });
  }
};

export const userController = { createUser };