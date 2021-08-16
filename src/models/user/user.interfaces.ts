import { Types, Document, Model } from "mongoose";
import { ITimestamp } from "../timestamp.interface";

export interface IUser extends ITimestamp {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  hobbies?: Types.ObjectId[];
}

export interface IUserDocument extends Omit<IUser, "_id">, Document {
  _id: Types.ObjectId;
}

export type IUserModel = Model<IUserDocument>;
