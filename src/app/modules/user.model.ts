import { Schema, model } from 'mongoose';
import {
  TFullName,
  TAddress,
  TOrder,
  IUser,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema: Schema<TFullName> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema: Schema<TAddress> = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema: Schema<TOrder> = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema: Schema<IUser, UserModel> = new Schema({
  userId: {
    type: Number,
    unique: true,
  },

  username: {
    type: String,
    unique: true,
  },

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

  email: {
    type: String,
    required: true,
    unique: true,
  },

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

userSchema.pre<IUser>('save', async function (next) {
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

userSchema.post('find', async function (docs: IUser[], next) {
  docs.forEach((doc) => {
    doc.orders = undefined;
  });

  next();
});

userSchema.post('findOneAndUpdate', async function (doc: IUser, next) {
  doc.orders = undefined;

  next();
});

userSchema.statics.isUserExist = async function (
  userId: number,
): Promise<IUser | null> {
  const user = await this.findOne({ userId: userId });
  return user;
};

export const User = model<IUser, UserModel>('User', userSchema);
