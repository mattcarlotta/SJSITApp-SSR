import * as types from "~types";
import messageReducer, { initialState } from "~reducers/Messages";
import * as mocks from "~reducers/__mocks__/reducers.mocks";

describe("Message Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(messageReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("sets a message", () => {
		const state = messageReducer(undefined, {
			type: types.MESSAGE_SET,
			payload: mocks.serverMessage,
		});
		expect(state).toEqual(mocks.serverMessage);
	});

	it("resets the message", () => {
		let state = messageReducer(undefined, {
			type: types.MESSAGE_SET,
			payload: mocks.serverMessage,
		});

		state = messageReducer(state, {
			type: types.MESSAGE_RESET,
		});

		expect(state).toEqual(initialState);
	});
});
