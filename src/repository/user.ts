import { Service } from "typedi";
import mongoose, { Types } from "mongoose";

import User from "../models/user/user.model";
import { IUser } from "../models/user/user.interfaces";

@Service()
export class UserRepository {
  findById = async (_id: string): Promise<IUser | null> => {
    if (!mongoose.isValidObjectId(_id)) throw new Error("invalid id passed");
    return User.findOne(
      {
        _id,
        $or: [{ deleted: { $exists: false } }, { deleted: false }],
      },
      { deleted: 0 }
    )
      .populate(
        {
          path: "hobbies",
          match:  {$or: [{ deleted: { $exists: false } }, { deleted: false }]},
          select: "id name passionLevel year"
        }
      )
      .lean();
  };

  findAll = async (): Promise<IUser[]> => {
    return User.find(
      {
        $or: [{ deleted: { $exists: false } }, { deleted: false }],
      },
      { deleted: 0 }
    )
      .populate(
      {
        path: "hobbies",
        match:  {$or: [{ deleted: { $exists: false } }, { deleted: false }]},
        select: "id name passionLevel year"
      })
      .lean();
  };

  create = async (args: IUser): Promise<IUser> => {
    return (await User.create({ ...args })).populate(
      {
        path: "hobbies",
        match:  {$or: [{ deleted: { $exists: false } }, { deleted: false }]},
        select: "id name passionLevel year"
      }
    );
  };

  updateById = async (
    _id: string,
    params: Partial<IUser>
  ): Promise<IUser | null> => {
    if (!mongoose.isValidObjectId(_id)) throw new Error("invalid id passed");

    return User.findOneAndUpdate(
      {
        _id,
        $or: [{ deleted: { $exists: false } }, { deleted: false }],
      },
      {
        $set: {
          ...params,
        },
      },
      {
        new: true,
        projection: {
          deleted: 0,
        },
      }
    )
      .populate(
        {
          path: "hobbies",
          match:  {$or: [{ deleted: { $exists: false } }, { deleted: false }]},
          select: "id name passionLevel year"
        }
      )
      .lean();
  };

  update = async (_id: Types.ObjectId, params): Promise<IUser | null> => {
    if (!mongoose.isValidObjectId(_id)) throw new Error("invalid id passed");

    return User.findOneAndUpdate(
      {
        _id,
        $or: [{ deleted: { $exists: false } }, { deleted: false }],
      },
      {
        ...params,
      },
      {
        new: true,
        projection: {
          deleted: 0,
        },
      }
    )
      .populate(
        {
          path: "hobbies",
          match:  {$or: [{ deleted: { $exists: false } }, { deleted: false }]},
          select: "id name passionLevel year"
        }
      )
      .lean();
  };

  deleteById = async (_id: string): Promise<boolean> => {
    if (!mongoose.isValidObjectId(_id)) throw new Error("invalid id passed");

    await User.updateOne(
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
