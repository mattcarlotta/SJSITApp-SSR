import * as types from "~types";
import teamsReducer, { initialState } from "~reducers/Teams";
import * as mocks from "~reducers/__mocks__/~reducers.mocks";

describe("Teams Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(teamsReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("sets and resets teams data", () => {
		let state = teamsReducer(undefined, {
			type: types.TEAMS_SET_NAMES,
			payload: { names: mocks.teams },
		});

		expect(state).toEqual({
			data: mocks.teams,
		});

		state = teamsReducer(undefined, {
			type: types.TEAMS_FETCH_NAMES,
		});

		expect(state).toEqual(initialState);
	});
});
