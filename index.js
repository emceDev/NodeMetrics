import express from "express";
import cors from "cors";
import { metricsRouter } from "./routes/metricRoute.js";

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

app.get("/", function (req, res, next) {
	res.json({ msg: "This is CORS-enabled for all origins!" });
	console.log("someone accessed /");
});
app.get("/gimme", metricsRouter);
app.put("/*", metricsRouter);
app.listen(3002, function () {
	console.log("CORS-enabled web server listening on port 3002");
});
