import { z, ZodError } from 'zod';
import { IUser } from './user.interface';

const fullNameValidation = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

const addressValidation = z.object({
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

const orderValidation = z.object({
  productName: z.string().min(1, { message: 'Product must be a string' }),
  price: z.number().min(0, { message: 'Price must be greater than 0' }),
  quantity: z.number().min(1, { message: 'Quantity must be greater than 0' }),
});

export const userValidation = z.object({
  userId: z.number().min(1, { message: 'User ID must be greater than 0' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  fullName: fullNameValidation,
  age: z.number().min(1, { message: 'Age must be greater than 0' }),
  email: z.string().email({ message: 'Invalid email' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1, { message: 'Hobby is required' })),
  address: addressValidation,
  orders: z.array(orderValidation).optional(),
});

export function validateUser(data: unknown): IUser {
  try {
    return userValidation.parse(data) as IUser;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Validation failed: ${error.message}`);
    }
    throw error;
  }
}
