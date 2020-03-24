import { expiredForm, invalidEventDate, unableToLocateEvents } from "../index";

describe("Message Errors", () => {
	it("displays an expired form message", () => {
		const expirationDate = "August 27th, 2019";
		const message = expiredForm(expirationDate);
		expect(message).toEqual(
			`The window to view and update this form was closed on ${expirationDate}.`,
		);
	});

	it("displays an invalid event date message", () => {
		const seasonId = "201920200";
		const seasonStartDate = "08/01/2019";
		const seasonEndDate = "06/29/2020";
		const message = invalidEventDate(seasonId, seasonStartDate, seasonEndDate);

		expect(message).toEqual(
			`The event date selected below falls outside of the ${seasonId} season. Please select a date within ${seasonStartDate} - ${seasonEndDate} or update the season's start and end date range.`,
		);
	});

	it("displays an event date range error message", () => {
		const startMonth = "11/01/2019";
		const endMonth = "11/29/2019";
		const message = unableToLocateEvents(startMonth, endMonth);

		expect(message).toEqual(
			`Unable to locate any events. There doesn't appear to be any events between ${startMonth}-${endMonth}.`,
		);
	});
});
