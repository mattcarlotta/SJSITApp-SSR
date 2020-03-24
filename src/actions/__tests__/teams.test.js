import * as types from "types";
import * as actions from "actions/Teams";

const data = ["San Jose Sharks", "San Jose Barracuda"];

describe("Team Actions", () => {
	it("returns TEAMS_FETCH_NAMES", () => {
		const value = actions.fetchTeamNames();

		expect(value).toEqual({
			type: types.TEAMS_FETCH_NAMES,
		});
	});

	it("returns TEAMS_SET_NAMES with data", () => {
		const value = actions.setTeamNames(data);

		expect(value).toEqual({
			type: types.TEAMS_SET_NAMES,
			payload: data,
		});
	});

	it("returns TEAMS_SET_NAMES with empty data", () => {
		const value = actions.setTeamNames();

		expect(value).toEqual({
			type: types.TEAMS_SET_NAMES,
			payload: [],
		});
	});
});
