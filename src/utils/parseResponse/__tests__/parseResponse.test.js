import { parseCookie, parseData, parseMessage } from "../index";

describe("Parse Data & Message", () => {
	it("parses a cookie from a request", () => {
		const cookie = "Test";
		const req = { headers: { cookie } };

		expect(parseCookie(req)).toEqual(req);
	});

	it("doesnt parse a cookie from a request", () => {
		const cookie = "";
		const req = { headers: { cookie } };

		expect(parseCookie(req)).toBeUndefined();
	});

	it("parses data from an API response", () => {
		const data = { email: "test@example.com" };
		const res = { data };

		expect(parseData(res)).toEqual(data);
	});

	it("parses a messages from an API response", () => {
		const message = { message: "Test" };
		const res = { data: { message } };

		expect(parseMessage(res)).toEqual(message);
	});
});
