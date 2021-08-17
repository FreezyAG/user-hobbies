/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import "reflect-metadata";
import path from "path";
import { Server } from "http";

import express from "express";
import bodyParser from "body-parser";
import dotEnv from 'dotenv';
import bunyanMiddleware from "express-bunyan-logger";
import morgan from "morgan";
import { Container, Service } from "typedi";
import helmet from "helmet";
import {
  useExpressServer,
  useContainer as routingUseContainer,
} from "routing-controllers";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

/* ---------------------------- internal imports ---------------------------- */
import config from "./config";
import { logger } from "./utils/logger";
import cors from "./middleware/utils";
import { createMongoDBConnection } from "./db/mongodb";
import ErrorHandler from "./middleware/error-handler";

dotEnv.config({ path: path.resolve(__dirname, '../.env') })

@Service()
export class App {
  public readonly expressApplication: express.Application;
  private swaggerDoc: unknown;

  constructor() {
    this.expressApplication = express();

    this.initializeMiddleware();
    this.configureSwagger();
    this.initializeSwagger();
    this.configureDependencyInjection();
    this.initializeControllers();
  }

  private initializeMiddleware(): void {
    this.expressApplication.use(helmet());
    this.expressApplication.use(morgan("tiny"));
    this.expressApplication.use(cors);
    this.expressApplication.use(bodyParser.json());

    if (config.env !== "test") {
      this.expressApplication.use(
        bunyanMiddleware({
          logger,
          parseUA: false,
          excludes: ["response-hrtime", "req-headers", "res-headers"],
          format: ":incoming :method :url :status-code",
        })
      );
    }
  }

  private configureSwagger(): void {
    this.swaggerDoc = swaggerJSDoc({
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Swagger Examples",
          version: "1.0.0",
        },
      },
      apis: ["./src/spec/*.yml", "./src/spec/components/*.yml"],
    });
  }

  private initializeSwagger(): void {
    this.expressApplication.use("/docs", swaggerUI.serve);
    this.expressApplication.get("/docs", swaggerUI.setup(this.swaggerDoc));
  }

  private configureDependencyInjection(): void {
    routingUseContainer(Container);
  }

  private initializeControllers(): void {
    useExpressServer(this.expressApplication, {
      controllers: [__dirname + "/controllers/*.ts"],
      defaultErrorHandler: false,
    });

    this.expressApplication.use("*", (_req, res, _next) =>
      res.status(404).json({ error: true, message: "Route not found." })
    );
    this.expressApplication.use(ErrorHandler);
  }

  public async startExpressServer(): Promise<Server> {
    const connection = await createMongoDBConnection();
    const server = await this.expressApplication.listen(config.server.port);

    if (connection) {
      logger.info("Hey! I'm connected to database...");
    }

    if (server) {
      logger.info(
        `🚀  Hey! I'm listening on port: ${config.server.port} ... API Documentation is available at /docs`
      );
    }

    return server;
  }
}
