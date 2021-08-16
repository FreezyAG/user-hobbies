import { Service } from "typedi";

import { HobbyRepository } from "../repository/hobby";
import { IHobby } from "../models/hobby/hobby.interfaces";

@Service()
export class HobbyService {
  constructor(private hobbyRepository: HobbyRepository) {}

  createHobby = async (args: IHobby): Promise<IHobby> => {
    return this.hobbyRepository.create(args);
  };

  findOrCreateHobby = async (args: IHobby): Promise<IHobby> => {
    const existingHobby = await this.hobbyRepository.findOne({
      name: args.name,
    });
    if (existingHobby) return existingHobby;
    return this.createHobby(args);
  };

  getHobby = async (hobbyId): Promise<IHobby | null> => {
    return this.hobbyRepository.findById(hobbyId);
  };

  getHobbyByAttribute = async (arg): Promise<IHobby | null> => {
    return this.hobbyRepository.findOne(arg);
  };

  getHobbies = (arg): Promise<IHobby[]> => {
    return this.hobbyRepository.find(arg);
  };

  updateHobby = (id, updateParam) => {
    return this.hobbyRepository.updateById(id, updateParam);
  };

  deleteHobby = (id): Promise<boolean> => {
    return this.hobbyRepository.deleteById(id);
  };
}
