import { Container } from "typedi";
import { Types } from "mongoose";

import { UserRepositoryTest } from "../mock-repositories/user.repository";
import { UserRepository } from "../../src/repository/user";
import { UserService } from "../../src/services/user";

import createUser from "../factories/user";

Container.set(UserRepository, new UserRepositoryTest());
const userRepository = Container.get(UserRepositoryTest);
const userService = Container.get(UserService);

beforeEach(() => userRepository.clearDb());

describe("User service", () => {
  describe("createUser", () => {
    it("creates a new user", async () => {
      const userObj = {
        _id: Types.ObjectId(),
        firstName: "John",
        lastName: "Doe",
        hobbies: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const user = await userService.createUser(userObj);

      expect(user).toBeDefined();
      expect(user).toMatchObject(userObj);
    });
  });

  describe("getUser", () => {
    it("fetches a user", async () => {
      const testUser = await createUser();
      const user = await userService.getUser(testUser._id);

      expect(user).toBeDefined();
      expect(user).toMatchObject(testUser);
    });
  });

  describe("getUsers", () => {
    it("returns all users", async () => {
      await createUser();
      const users = await userService.getUsers();

      expect(users).toBeArrayOfSize(1);
    });
  });

  describe("updateUser", () => {
    it("updates a specified user details", async () => {
      const testUser = await createUser();
      const users = await userService.updateUser(testUser._id, {
        firstName: "Updated",
        lastName: "Details",
      });

      expect(users.firstName).toBe("Updated");
      expect(users.lastName).toBe("Details");
    });
  });

  describe("deleteUser", () => {
    it("deletes a user", async () => {
      const testUser = await createUser();
      const response = await userService.deleteUser(testUser._id);

      expect(response).toBeTrue();
    });
  });
});
