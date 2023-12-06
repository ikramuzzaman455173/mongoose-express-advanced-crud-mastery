import { Schema, model } from 'mongoose';
import {
  TFullName,
  TAddress,
  TOrder,
  TUser,
  UserModel,
} from './user.interfase';
import bcrypt from 'bcrypt';
import config from '../app/config';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },

  password: {
    type: String,
    required: true,
    select: false,
  },

  fullName: {
    type: fullNameSchema,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  email: { type: String, unique: true },

  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },

  hobbies: {
    type: [String],
    required: true,
  },

  address: {
    type: addressSchema,
    required: true,
  },

  orders: {
    type: [orderSchema],
  },
});

userSchema.pre<TUser>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  const user = await User.findOne(doc._id).select('-password -orders');
  if (user) {
    Object.assign(doc, user);
  }
  next();
});

userSchema.post('find', async function (docs: TUser[], next) {
  docs.forEach((doc) => {
    doc.orders = undefined;
  });

  next();
});

userSchema.post('findOneAndUpdate', async function (doc: TUser, next) {
  doc.orders = undefined;

  next();
});

userSchema.statics.isUserExist = async function (
  userId: number,
): Promise<TUser | null> {
  const user = await this.findOne({ userId: userId });
  return user;
};

export const User = model<TUser, UserModel>('User', userSchema);
