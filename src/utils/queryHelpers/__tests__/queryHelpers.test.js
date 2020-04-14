import { parseQuery } from "../index";

describe("Query Helpers", () => {
	it("should return a page query if empty", async () => {
		const selectedDate = "1/2/2020";
		expect(parseQuery({ selectedDate })).toEqual({
			selectedDate,
			page: 1,
		});
	});
});
