import { model, Schema } from 'mongoose';
import { TUser, UserName } from './user.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<TUser>(
  {
    name: userNameSchema,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);

// name: string – The full name of the user.
// email: string – The email address of the user, used for authentication and communication.
// password: string – The password for the user, securely stored.
// role: "admin" | "user" – The role of the user, determining their access level. Default is "user".
// isBlocked: boolean – A flag indicating whether the user is blocked or not. Default is false.
// createdAt: Date – The timestamp when the user was created.
// updatedAt: Date – The timestamp of the last update to the user.
