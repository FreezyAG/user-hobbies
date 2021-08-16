import { Response, Request, Next } from "express";
import { Service } from "typedi";
import {
  JsonController,
  Req,
  Res,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  UseBefore,
} from "routing-controllers";

/* ---------------------------- internal imports ---------------------------- */
import { IUser } from "../models/user/user.interfaces";
import {
  sendSuccessResponse,
  sendFailureResponse,
  sendNotFoundResponse,
} from "../utils/responses";
import { UserService } from "../services/user";
import validate from "../middleware/validation";
import { PostUserRequestBody, PatchUserRequestBody } from "../schema/user";

@Service()
@JsonController()
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/user")
  @UseBefore(validate(PostUserRequestBody))
  async createUser(@Body() body: IUser, @Res() res: Response, next: Next) {
    try {
      const user = await this.userService.createUser({ ...body });
      sendSuccessResponse(res, "User created successfully", user);
    } catch (error) {
      sendFailureResponse(error);
    }
  }

  @Get("/user/:userId")
  async getUser(
    @Param("userId") userId: string,
    @Res() res: Response,
    next: Next
  ): Promise<Response> {
    try {
      const user = await this.userService.getUser(userId);
      if (user) sendSuccessResponse(res, "User retrieved successfully", user);
      else sendNotFoundResponse("User not found");
    } catch (error) {
      sendFailureResponse(error);
    }
  }

  @Get("/users")
  async getUsers(@Res() res: Response, next: Next) {
    try {
      const users = await this.userService.getUsers();
      sendSuccessResponse(res, "Users retrieved successfully", users);
    } catch (error) {
      sendFailureResponse(error);
    }
  }

  @Patch("/user/:userId")
  @UseBefore(validate(PatchUserRequestBody))
  async updateUser(
    @Param("userId") userId: string,
    @Body() body: Partial<IUser>,
    @Res() res: Response,
    next: Next
  ) {
    try {
      const user = await this.userService.updateUser(userId, body);
      sendSuccessResponse(res, "User updated successfully", user);
    } catch (error) {
      sendFailureResponse(error);
    }
  }

  @Delete("/user/:userId")
  async deleteUser(
    @Param("userId") userId: string,
    @Res() res: Response,
    next: Next
  ) {
    try {
      await this.userService.deleteUser(userId);
      sendSuccessResponse(res, "User deleted successfully", true);
    } catch (error) {
      sendFailureResponse(error);
    }
  }
}
