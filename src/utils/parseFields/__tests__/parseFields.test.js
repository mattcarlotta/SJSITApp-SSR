import moment from "moment-timezone";
import parsedFields from "../index";

describe("Parse Fields Helper", () => {
	it("throws an error if missing required parameters", () => {
		const nextFields = parsedFields();
		expect(nextFields).toEqual("Error: You must supply an array of fields!");
	});

	it("doesn't parse empty callTime values", () => {
		const fields = [
			{
				name: "callTime1",
				type: "time",
				value: moment(new Date("2019-12-17T01:00:00")),
			},
			{
				name: "callTime2",
				type: "time",
				value: "",
			},
		];

		const nextFields = parsedFields(fields);
		expect(nextFields).toEqual(
			expect.objectContaining({
				callTimes: ["2019-12-17T01:00:00-08:00"],
			}),
		);
	});

	it("parses an array of fields", () => {
		const fields = [
			{
				name: "email",
				type: "text",
				value: "test@example.com",
			},
			{
				name: "password",
				type: "password",
				value: "12345",
			},
			{
				name: "seasonDuration",
				type: "range",
				value: [
					moment(new Date("2019-12-17T01:00:00")),
					moment(new Date("2019-12-17T02:00:00")),
				],
			},
			{
				name: "callTime1",
				type: "time",
				value: moment(new Date("2019-12-17T01:00:00")),
			},
			{
				name: "callTime2",
				type: "time",
				value: moment(new Date("2019-12-17T02:00:00")),
			},
			{
				name: "callTime3",
				type: "time",
				value: moment(new Date("2019-12-17T03:00:00")),
			},
			{
				name: "0123456789",
				type: "radiogroup",
				value: "I want to work.",
				updateEvent: true,
			},
			{
				name: "1234567891",
				type: "radiogroup",
				value: "Available to work.",
				updateEvent: false,
			},
		];

		const nextFields = parsedFields(fields);
		expect(nextFields).toEqual(
			expect.objectContaining({
				email: "test@example.com",
				password: "12345",
				seasonDuration: [
					"2019-12-17T01:00:00-08:00",
					"2019-12-17T02:00:00-08:00",
				],
				callTimes: [
					"2019-12-17T01:00:00-08:00",
					"2019-12-17T02:00:00-08:00",
					"2019-12-17T03:00:00-08:00",
				],
				responses: [
					{
						id: "0123456789",
						value: "I want to work.",
						updateEvent: true,
					},
					{
						id: "1234567891",
						value: "Available to work.",
						updateEvent: false,
					},
				],
			}),
		);
	});
});
