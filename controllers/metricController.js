import fs from "fs";

export const metricController = (req, res) => {
	const path = process.env.DIR_PATH;
	// console.log("controller", path);

	const data = req.body;
	const interaction = data.interaction;
	const txt = JSON.stringify(interaction);

	fs.readFile(path + "/" + req.url + ".txt", "utf8", (err, data) => {
		if (err) {
			console.error("1", err);
			return fs.writeFile(path + "/" + req.url + ".txt", txt, (err, data) => {
				if (err) {
					console.log(err);
				} else {
					console.log("succesfully wrote new file ");
				}
			});
			return;
		} else {
			{
				const fileData = JSON.parse(data);
				const reqData = req.body.interaction;
				const mergedData = JSON.stringify(fileData.concat(reqData));
				return fs.writeFile(path + "/" + req.url + ".txt", mergedData, () => {
					if (err) {
						console.log(err);
					} else {
						console.log("succesfully wrote to file ");
					}
				});
			}
		}
	});
	res.status(200);
	return res.json();
};
export const getMetricsController = (req, res) => {
	const path = process.env.DIR_PATH;
	console.log("reading from", path);
	const dirs = fs.readdir(path, (err, x) => {
		return err ? res.json("error while fetching file") : res.json(x);
	});
	return dirs;
};
export const getFile = (req, res) => {
	const path = process.env.DIR_PATH;
	let queried = Object.keys(req.query)[0];
	console.log("x", queried);
	const stream = fs.createReadStream(path + queried);
	stream.on("open", () => {
		console.log("stream opened");
		stream.pipe(res);
	});
	stream.on("error", function (err) {
		console.log("error");
		res.end(err);
	});
	stream.on("end", () => {
		console.log("finsihed");
	});
	return;
};
