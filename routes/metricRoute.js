import express from "express";
import {
	getFile,
	getMetricsController,
	metricController,
} from "../controllers/metricController.js";
import { urlCheck } from "../middleware/urlCheck.js";

export const metricsRouter = express.Router();

metricsRouter.put("*", urlCheck, metricController);
metricsRouter.get("/metrics", getMetricsController);
metricsRouter.get("/metrics/*", getFile);
