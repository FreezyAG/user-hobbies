import { Response, Next } from "express";
import { Types } from "mongoose";
import { Service } from "typedi";
import {
  JsonController,
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
import { IHobby } from "../models/hobby/hobby.interfaces";
import {
  sendSuccessResponse,
  sendFailureResponse,
  sendNotFoundResponse,
} from "../utils/responses";
import { UserService } from "../services/user";
import { HobbyService } from "../services/hobby";
import validate from "../middleware/validation";
import { PostHobbyRequestBody, PatchHobbyRequestBody } from "../schema/hobby";

@Service()
@JsonController()
export class HobbyController {
  constructor(
    private hobbyService: HobbyService,
    private userService: UserService
  ) {}

  @Post("/hobby/:userId")
  @UseBefore(validate(PostHobbyRequestBody))
  async createHobby(
    @Param("userId") userId: string,
    @Body() body: IHobby,
    @Res() res: Response,
    next: Next
  ) {
    try {
      const user = await this.userService.getUser(userId);
      if (!user) return sendNotFoundResponse("User not found");

      const hobby = await this.hobbyService.findOrCreateHobby({
        ...body,
        user: Types.ObjectId(userId),
      });
      await this.userService.linkHobbyWithUser(user._id, hobby._id);

      sendSuccessResponse(res, "Hobby created successfully", hobby);
    } catch (error) {
      sendFailureResponse(error);
    }
  }

  @Get("/hobby/:hobbyId")
  async getHobby(
    @Param("hobbyId") hobbyId: string,
    @Res() res: Response,
    next: Next
  ): Promise<Response> {
    try {
      const hobby = await this.hobbyService.getHobby(hobbyId);
      if (hobby)
        sendSuccessResponse(res, "Hobby retrieved successfully", { ...hobby });
      else sendNotFoundResponse("User not found");
    } catch (error) {
      sendFailureResponse(error);
    }
  }

  @Get("/hobbies/:userId")
  async getHobbies(
    @Param("userId") userId: string,
    @Res() res: Response,
    next: Next
  ) {
    try {
      const user = await this.userService.getUser(userId);
      if (!user) sendNotFoundResponse("User not found");

      const hobbies = await this.hobbyService.getHobbies({ user: userId });
      sendSuccessResponse(res, "Hobbies retrieved successfully", hobbies);
    } catch (error) {
      sendFailureResponse(error);
    }
  }

  @Patch("/hobby/:hobbyId")
  @UseBefore(validate(PatchHobbyRequestBody))
  async updateHobby(
    @Param("hobbyId") hobbyId: string,
    @Body() body: Partial<IHobby>,
    @Res() res: Response,
    next: Next
  ) {
    try {
      const hobby = await this.hobbyService.updateHobby(hobbyId, body);
      sendSuccessResponse(res, "Hobby updated successfully", hobby);
    } catch (error) {
      sendFailureResponse(error);
    }
  }

  @Delete("/hobby/:hobbyId")
  async deleteHobby(
    @Param("hobbyId") hobbyId: string,
    @Res() res: Response,
    next: Next
  ) {
    try {
      const hobby = await this.hobbyService.getHobby(hobbyId);
      if (!hobby) return sendNotFoundResponse("Hobby not found");

      await this.userService.unlinkHobbyFromUser(hobby.user, hobby._id);
      await this.hobbyService.deleteHobby(hobby._id);
      sendSuccessResponse(res, "Hobby deleted successfully", true);
    } catch (error) {
      sendFailureResponse(error);
    }
  }
}
