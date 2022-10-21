export const urlCheck = (req, res, next) => {
	const whitelist = JSON.parse(process.env.WHITELIST);
	// console.log("checker", req.url, whitelist);

	const x = whitelist.find((e) => e === req.url.replace("/", ""));

	if (x !== undefined) {
		console.log("check passed");
		next();
	} else {
		console.log("url not whitelisted", req.url);
		return "bad";
	}
};
