import { Types, Document, Model } from "mongoose";
import { ITimestamp } from "../timestamp.interface";

export interface IHobby extends ITimestamp {
  _id: Types.ObjectId;
  name: string;
  user: Types.ObjectId;
  passionLevel: string;
  year: number;
}

export interface IHobbyDocument extends Omit<IHobby, "_id">, Document {
  _id: Types.ObjectId;
}

export type IHobbyModel = Model<IHobbyDocument>;
