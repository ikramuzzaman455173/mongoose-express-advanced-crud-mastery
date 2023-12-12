import { IUser, TOrder } from './user.interface';
import { User } from './user.model';

export async function createUser(userData: IUser): Promise<IUser> {
  const newUser = await User.create(userData);
  return newUser;
}

export async function getAllUsers(): Promise<IUser[]> {
  const users = await User.find();
  return users;
}

export async function getUserById(userId: string): Promise<IUser | null> {
  const userIdNumber = Number(userId);

  const existingUser = await User.isUserExist(userIdNumber);

  if (!existingUser) {
    throw new Error('User does not exist!');
  } else {
    const user = await User.findOne({ userId: userId }).select('-orders');
    return user;
  }
}

export async function updateUser(
  userId: string,
  userData: IUser,
): Promise<IUser | null> {
  const userIdNumber = Number(userId);

  const existingUser = await User.isUserExist(userIdNumber);

  if (!existingUser) {
    throw new Error('User does not exist!');
  } else {
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      userData,
      { new: true },
    );
    return updatedUser;
  }
}

export async function deleteUser(userId: string): Promise<IUser | null> {
  const userIdNumber = Number(userId);

  const existingUser = await User.isUserExist(userIdNumber);

  if (!existingUser) {
    throw new Error('User does not exist!');
  } else {
    const deletedUser = await User.findOneAndDelete({ userId: userId });
    return deletedUser;
  }
}

export async function addOrder(
  userId: string,
  orderData: TOrder,
): Promise<IUser | null> {
  const userIdNumber = Number(userId);

  const existingUser = await User.isUserExist(userIdNumber);

  if (!existingUser) {
    throw new Error('User does not exist!');
  } else {
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      { $push: { orders: orderData } },
      { new: true },
    );
    return updatedUser;
  }
}

export async function getOrders(userId: string): Promise<TOrder[] | null> {
  const userIdNumber = Number(userId);

  const existingUser = await User.isUserExist(userIdNumber);

  if (!existingUser) {
    throw new Error('User does not exist!');
  } else {
    const user = await User.findOne({ userId: userId });
    return user?.orders || null;
  }
}

export async function calculateTotalPrice(userId: string): Promise<number> {
  const userIdNumber = Number(userId);

  const existingUser = await User.isUserExist(userIdNumber);

  if (!existingUser) {
    throw new Error('User does not exist!');
  } else {
    const user = await User.findOne({ userId: userId });
    const totalPrice = user?.orders?.reduce((acc, order) => {
      return acc + order.price * order.quantity;
    }, 0);
    return totalPrice || 0;
  }
}
