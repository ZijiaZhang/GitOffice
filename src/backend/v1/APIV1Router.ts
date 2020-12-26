import * as express from "express";
import {loginRouter} from "./Login";
import {github_api_router} from "./GithubOperations";

export const APIV1Router = express.Router()

APIV1Router.use('/login', loginRouter);
APIV1Router.use('/github', github_api_router);
