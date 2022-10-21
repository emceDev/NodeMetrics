const whitelist = ["siemens", "avon", "agreos"];
export const urlCheck = (req, res, next) => {
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
