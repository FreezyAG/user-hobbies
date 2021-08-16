import { Container } from "typedi";
import { Application } from "express";
import request from "supertest";

import { UserRepositoryTest } from "../../mock-repositories/user.repository";
import { UserRepository } from "../../../src/repository/user";

import User from "../../factories/user";

Container.set(UserRepository, new UserRepositoryTest());
const userRepository = Container.get(UserRepositoryTest);

import { App } from "../../../src/app";

describe("User routes", () => {
  let expressApplication: Application;
  beforeAll(() => {
    expressApplication = Container.get(App).expressApplication;
  });

  beforeEach(() => userRepository.clearDb());

  describe("createUser", () => {
    async function createUser(requestBody) {
      const { body: response } = await request(expressApplication)
        .post("/user")
        .send(requestBody);
      return {
        response,
      };
    }
    it("creates a user", async (done) => {
      const userObj = {
        firstName: "John",
        lastName: "Doe",
      };
      const { response } = await createUser(userObj);

      expect(response.error).toBeFalse();
      expect(response.message).toBe("User created successfully");
      expect(response.data).toEqual(expect.objectContaining(userObj));
      done();
    });
  });

  describe("getUser", () => {
    async function getUser(userId) {
      const { body: response } = await request(expressApplication).get(
        `/user/${userId}`
      );
      return {
        response,
      };
    }
    it("fetches a user", async (done) => {
      const testUser = await User();
      const { response } = await getUser(testUser._id);

      expect(response.error).toBeFalse();
      expect(response.message).toBe("User retrieved successfully");
      expect(response.data).toEqual(expect.objectContaining(testUser));
      done();
    });
  });

  describe("getUsers", () => {
    async function getUsers() {
      const { body: response } = await request(expressApplication).get(
        "/users"
      );
      return {
        response,
      };
    }
    it("fetches all user", async (done) => {
      const testUser1 = await User({ firstName: "John" });
      const testUser2 = await User({ firstName: "Doe" });
      const { response } = await getUsers();

      expect(response.error).toBeFalse();
      expect(response.message).toBe("Users retrieved successfully");
      expect(response.data).toEqual([testUser1, testUser2]);
      done();
    });
  });

  describe("updateUser", () => {
    async function updateUser(userId, requestBody) {
      const { body: response } = await request(expressApplication)
        .patch(`/user/${userId}`)
        .send(requestBody);
      return {
        response,
      };
    }
    it("updates user details", async (done) => {
      const update = "Updated First name";
      const testUser = await User();
      const { response } = await updateUser(testUser._id, {
        firstName: update,
      });

      expect(response.error).toBeFalse();
      expect(response.message).toBe("User updated successfully");
      expect(response.data.firstName).toEqual(update);
      done();
    });
  });

  describe("deleteUser", () => {
    async function deleteUser(userId) {
      const { body: response } = await request(expressApplication).delete(
        `/user/${userId}`
      );
      return {
        response,
      };
    }
    it("updates user details", async (done) => {
      const testUser = await User();
      const { response } = await deleteUser(testUser._id);

      expect(response.error).toBeFalse();
      expect(response.message).toBe("User deleted successfully");
      expect(response.data).toBeTrue();
      done();
    });
  });
});
