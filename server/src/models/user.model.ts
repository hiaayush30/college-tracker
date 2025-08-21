import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role:Role;
  createdAt:Date;
  updatedAt:Date;
}

export enum Role {
    "admin",
    "student"
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:Role
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
