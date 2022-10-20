import express from "express";
import cors from "cors";
import { metricsRouter } from "./routes/metricRoute.js";

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res, next) {
	res.json({ msg: "This is CORS-enabled for all origins!" });
	console.log("someone accessed /");
});
app.get("/gimme", metricsRouter);
app.put("/*", metricsRouter);
app.listen(3002, function () {
	console.log("CORS-enabled web server listening on port 3002");
});
