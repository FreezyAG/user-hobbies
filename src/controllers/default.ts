import { Response, Request } from "express";
import { Service } from "typedi";
import { JsonController, Req, Res, Get } from "routing-controllers";

@Service()
@JsonController()
export class DefaultController {
  @Get("/")
  public healthCheck(@Req() _req: Request, @Res() res: Response): Response {
    return res.send({ message: "Hello World" });
  }
}
