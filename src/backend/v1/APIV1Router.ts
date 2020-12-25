import * as express from "express";
import {loginRouter} from "./Login";

export const APIV1Router = express.Router()

APIV1Router.use('/login', loginRouter);