import express from "express";

export const apiRouter = express.Router();

apiRouter.use('/v1', apiV1Router);
