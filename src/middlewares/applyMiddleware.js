import pify from "pify";

export default modules => async (req, res) => {
	for (const m in modules) {
		await pify(modules[m])(req, res);
	}
};
