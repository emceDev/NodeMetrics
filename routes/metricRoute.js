import express from "express";
import { metricController } from "../controllers/metricController.js";
import { urlCheck } from "../middleware/urlCheck.js";

export const metricsRouter = express.Router();

metricsRouter.put("*", urlCheck, metricController);
