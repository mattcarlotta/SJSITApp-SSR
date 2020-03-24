import parseToken from "../index";

describe("Parse Token Helper", () => {
	it("doesn't throw errors if token is missing", () => {
		const search = "";

		const parsedToken = parseToken(search);
		expect(parsedToken).toBeUndefined();
	});

	it("parses a token from a string", () => {
		const token = "1223456789";
		const search = `?token=${token}`;

		const parsedToken = parseToken(search);
		expect(parsedToken).toEqual(token);
	});
});
