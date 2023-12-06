/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import {
  addOrder,
  calculateTotalPrice,
  createUser,
  deleteUser,
  getAllUsers,
  getOrders,
  getUserById,
  updateUser,
} from './userService';
import userValidation from './user.validation';

export const createUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = req.body;
    if (!Array.isArray(user.hobbies)) {
      user.hobbies = [user.hobbies];
    }
    const validatedUser = userValidation.parse(user);
    const newUser = await createUser(validatedUser);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: newUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to create user!',
      error: {
        code: 400,
        description: error,
      },
    });
  }
};

export const getUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch users!',
      error: {
        code: 400,
        description: error,
      },
    });
  }
};

export const userByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch user!',
      error: {
        code: 400,
        description: error,
      },
    });
  }
};

export const updateAUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const validatedUser = userValidation.parse(userData);
    const updatedUser = await updateUser(userId, validatedUser);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch user!',
      error: {
        code: 400,
        description: error,
      },
    });
  }
};

export const deleteSingleUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    await deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch user!',
      error: {
        code: 400,
        description: error,
      },
    });
  }
};
export const addOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const orderData = req.body;
    await addOrder(userId, orderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to add order!',
      error: {
        code: 400,
        description: error,
      },
    });
  }
};
export const getOrdersOfUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const orders = await getOrders(userId);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: { orders },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch orders!',
      error: {
        code: 400,
        description: error,
      },
    });
  }
};

export const calculatePrice = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const totalPrice = await calculateTotalPrice(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: totalPrice.toFixed(2),
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to calculate total price!',
      error: {
        code: 400,
        description: error,
      },
    });
  }
};
