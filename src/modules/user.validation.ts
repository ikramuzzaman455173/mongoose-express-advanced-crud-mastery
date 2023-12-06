import { z } from 'zod';

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
  productName: z.string().min(1, { message: 'Product name is required' }),
  price: z.number().min(0, { message: 'Price must be greater than 0' }),
  quantity: z.number().min(1, { message: 'Quantity must be greater than 0' }),
});

const userValidation = z.object({
  userId: z.number().min(1, { message: 'User ID must be greater than 0' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  fullName: fullNameValidation,
  age: z.number().min(0, { message: 'Age must be greater than or equal to 0' }),
  email: z.string().email({ message: 'Invalid email format' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1, { message: 'Hobby is required' })),
  address: addressValidation,
  orders: z.array(orderValidation),
});

export default userValidation;
