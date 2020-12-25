import express from "express";

export const apiV1Router = express.Router()

apiV1Router.use('/login', loginRouter);