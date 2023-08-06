import "module-alias/register";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(__dirname, "..", `.env.${process.env.NODE_ENV}`),
});
import express from "express";
import * as availableRoutes from "./routes";
import { IRoutes } from "./types/route";
import cors from "cors";
import errorMiddleware, { ServerError } from "./middlewares/error.middleware";
import { keycloak } from "./auth/keycloak";
import expressSession from "express-session";
import { initMongoDBStore } from "./db/mongoStore";
import { mongodbConnect } from "~/db";
import morgan from "morgan";
import { KafkaService } from "./kafka";

const app = express();

app.use(morgan("tiny"));

app.use(
  expressSession({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: initMongoDBStore(expressSession),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      secure: process.env.NODE_ENV === "production",
    },
  })
);
if (process.env.NODE_ENV === "production") app.set("trust proxy", true);

app.use(keycloak.middleware());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

const routes: IRoutes = availableRoutes;

Object.keys(routes).forEach((path) => {
  return app.use(`/api/` + path, routes[path]);
});

app.use(errorMiddleware);

mongodbConnect()
  .catch((err) => console.log(err))
  .finally(() => console.log("MongoDB is connected"));

KafkaService.consume().catch((error) => {
  throw new ServerError(error, 500);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
