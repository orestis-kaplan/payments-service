import "module-alias/register";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
import express from "express";
import * as availableRoutes from "./routes";
import { IRoutes } from "./types/route";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import bodyParser from "body-parser";
import { keycloak } from "./auth/keycloak";
import expressSession from "express-session";
import { initMongoDBStore } from "./db/mongoStore";
import { mongodbConnect } from "~/db";
import morgan from "morgan";

const app = express();

app.use(morgan("tiny"));

app.use(
  expressSession({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: initMongoDBStore(expressSession),
  })
);
// app.set('trust proxy', true );

app.use(keycloak.middleware());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const routes: IRoutes = availableRoutes;

Object.keys(routes).forEach((path) => {
  return app.use(`/api/` + path, routes[path]);
});

app.use(errorMiddleware);

mongodbConnect()
  .catch((err) => console.log(err))
  .finally(() => console.log("MongoDB is connected"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
