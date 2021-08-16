import { Service } from "typedi";
import { Types } from "mongoose";

import { UserRepository } from "../repository/user";
import { IUser } from "../models/user/user.interfaces";

@Service()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  createUser = async (args: IUser): Promise<IUser> => {
    return this.userRepository.create(args);
  };

  getUser = async (userId: string): Promise<IUser | null> => {
    return this.userRepository.findById(userId);
  };

  getUsers = (): Promise<IUser[]> => {
    return this.userRepository.findAll();
  };

  updateUser = (
    id: string,
    updateParam: Partial<IUser>
  ): Promise<IUser | null> => {
    return this.userRepository.updateById(id, updateParam);
  };

  linkHobbyWithUser = (
    id: Types.ObjectId,
    hobbyId: Types.ObjectId
  ): Promise<IUser | null> => {
    return this.userRepository.update(id, { $addToSet: { hobbies: hobbyId } });
  };

  unlinkHobbyFromUser = (
    id: Types.ObjectId,
    hobbyId: Types.ObjectId
  ): Promise<IUser | null> => {
    return this.userRepository.update(id, { $pull: { hobbies: hobbyId } });
  };

  deleteUser = (id: string): Promise<boolean> => {
    return this.userRepository.deleteById(id);
  };
}
