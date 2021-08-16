import { Service } from "typedi";
import mongoose from "mongoose";

import Hobby from "../models/hobby/hobby.model";
import { IHobby } from "../models/hobby/hobby.interfaces";

@Service()
export class HobbyRepository {
  findById = async (_id: string): Promise<IHobby | null> => {
    if (!mongoose.isValidObjectId(_id)) throw new Error("invalid id passed");

    return Hobby.findOne({
      _id,
      $or: [{ deleted: { $exists: false } }, { deleted: false }],
    }).lean();
  };

  find = async (arg): Promise<IHobby[]> => {
    return Hobby.find({
      ...arg,
      $or: [{ deleted: { $exists: false } }, { deleted: false }],
    }).lean();
  };

  findOne = async (arg): Promise<IHobby> => {
    return Hobby.findOne({
      ...arg,
      $or: [{ deleted: { $exists: false } }, { deleted: false }],
    }).lean();
  };

  create = async (args: IHobby): Promise<IHobby> => {
    return Hobby.create({ ...args });
  };

  updateById = async (
    id: string,
    params: Partial<IHobby>
  ): Promise<IHobby | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("invalid id passed");

    return Hobby.findByIdAndUpdate(
      id,
      {
        $set: {
          ...params,
        },
      },
      { new: true }
    ).lean();
  };

  deleteById = async (_id: string): Promise<boolean> => {
    if (!mongoose.isValidObjectId(_id)) throw new Error("invalid id passed");

    await Hobby.updateOne(
      { _id },
      {
        $set: {
          deleted: true,
        },
      }
    ).lean();

    return true;
  };
}
