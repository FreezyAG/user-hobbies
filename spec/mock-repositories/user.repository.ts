import { Service } from "typedi";

import { Modify } from "../../src/lib/interfaces";
import { IUser } from "../../src/models/user/user.interfaces";

let model: Modify<IUser, { _id: number }>[] = [];

@Service()
export class UserRepositoryTest {
  findById = (id) => {
    return model.find((user) => user._id == id);
  };

  findAll = () => {
    return [...model];
  };

  create = (args) => {
    const _id = args?._id ? args._id : model.length + 1;
    model.push({ ...args, _id });
    return this.findById(_id);
  };

  updateById = (id, params) => {
    const index = model.findIndex((user) => user._id == id);
    model[0] = { ...model[0], ...params };
    return model[index];
  };

  deleteById = (id) => {
    const index = model.findIndex((user) => user._id == id);
    model.splice(index, 1);
    return true;
  };

  clearDb = () => {
    model = [];
    return true;
  };
}
