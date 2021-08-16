import { model, Schema, Types } from "mongoose";
import { IUserModel, IUserDocument } from "./user.interfaces";

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      index: true,
    },
    hobbies: {
      type: [Types.ObjectId],
      ref: "Hobby",
    },
    deleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default model<IUserDocument, IUserModel>("User", UserSchema);
