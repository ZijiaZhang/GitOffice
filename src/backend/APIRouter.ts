import * as express from "express";
import {APIV1Router} from "./v1/APIV1Router";

export const APIRouter = express.Router();

APIRouter.use('/v1', APIV1Router);
