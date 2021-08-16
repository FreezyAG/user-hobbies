import { Container } from "typedi";
import { IUser } from "../../src/models/user/user.interfaces";
import { UserRepositoryTest } from "../mock-repositories/user.repository";

const userRepository = Container.get(UserRepositoryTest);

function createUser(overrides?: Record<string, any>): IUser {
  const userObject = {
    firstName: "firstName",
    lastName: "lastName",
    hobbies: [],
  };

  Object.entries(overrides || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      userObject[key] = value;
    }
  });

  return userRepository.create(userObject);
}

export default createUser;
