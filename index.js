import express from "express";
import cors from "cors";
import { metricsRouter } from "./routes/metricRoute.js";
import "dotenv/config";

var app = express();
let whitelist = ["http://localhost:3000"];
process.env.NODE_ENV === "production"
	? (whitelist = ["http://20.216.147.240"])
	: (whitelist = ["http://localhost:3000"]);

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: false,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.put("/*", metricsRouter);
app.get("/metrics", metricsRouter);
app.get("/metrics/*", metricsRouter);
app.listen(3002, function () {
	console.log("CORS-enabled web server listening on port 3002");
});
