import * as types from "~types";
import mailReducer, { initialState } from "~reducers/Mail";
import * as mocks from "~reducers/__mocks__/~reducers.mocks";

const mailData = {
	mail: mocks.mailData,
	totalDocs: 1,
};

describe("Mail Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(mailReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("sets mail data", () => {
		const state = mailReducer(undefined, {
			type: types.MAIL_SET,
			payload: mailData,
		});

		expect(state).toEqual({
			data: mocks.mailData,
			editMail: {},
			isLoading: false,
			totalDocs: 1,
		});
	});

	it("when fetching all mail, resets to initialState", () => {
		let state = mailReducer(undefined, {
			type: types.MAIL_SET,
			payload: mailData,
		});

		state = mailReducer(state, {
			type: types.MAIL_FETCH,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching a mail for editing, resets to initialState", () => {
		let state = mailReducer(undefined, {
			type: types.MAIL_SET_EDIT,
			payload: mocks.mailData[0],
		});

		state = mailReducer(state, {
			type: types.MAIL_EDIT,
		});

		expect(state).toEqual(initialState);
	});

	it("sets mail for editing", () => {
		const state = mailReducer(undefined, {
			type: types.MAIL_SET_EDIT,
			payload: mocks.mailData[0],
		});

		expect(state).toEqual({
			data: [],
			editMail: mocks.mailData[0],
			isLoading: true,
			totalDocs: 0,
		});
	});
});
