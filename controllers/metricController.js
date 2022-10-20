import fs from "fs";
export const metricController = (req, res) => {
	const path = "G:/programowanie/node/metricsServer/";
	// console.log("controller", req.body);
	const data = req.body;
	const interaction = data.interaction;
	const z = interaction.map((x) => x);

	fs.appendFile(path + req.url + ".txt", JSON.stringify(interaction), (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log("succes written", interaction[0]);
		}
	});
	res.status(200);
	return res.json();
};
