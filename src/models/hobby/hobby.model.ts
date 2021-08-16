import { model, Schema, Types } from "mongoose";
import { IHobbyModel, IHobbyDocument } from "./hobby.interfaces";

const HobbySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    passionLevel: {
      type: String,
      index: true,
    },
    year: {
      type: Number,
    },
    deleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default model<IHobbyDocument, IHobbyModel>("Hobby", HobbySchema);
