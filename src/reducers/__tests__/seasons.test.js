import * as types from "~types";
import seasonReducer, { initialState } from "~reducers/Seasons";
import * as mocks from "~reducers/__mocks__/~reducers.mocks";

const seasonsData = {
	seasons: mocks.seasonsData,
	totalDocs: 1,
};

const seasonData = {
	season: mocks.seasonsData,
};

const seasonIdsData = {
	seasonIds: mocks.seasonIdsData,
};

describe("Season Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(seasonReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("resets to initialState", () => {
		let state = seasonReducer(undefined, {
			type: types.SEASONS_SET,
			payload: seasonsData,
		});

		state = seasonReducer(state, {
			type: types.SEASONS_RESET,
		});

		expect(state).toEqual(initialState);
	});

	it("sets seasons data", () => {
		const state = seasonReducer(undefined, {
			type: types.SEASONS_SET,
			payload: seasonsData,
		});

		expect(state).toEqual({
			data: mocks.seasonsData,
			isLoading: false,
			totalDocs: 1,
			editSeason: {},
			ids: [],
		});
	});

	it("when fetching all seasons, resets to initialState", () => {
		let state = seasonReducer(undefined, {
			type: types.SEASONS_SET,
			payload: seasonsData,
		});

		state = seasonReducer(state, {
			type: types.SEASONS_FETCH,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching season ids for editing a member token, resets to initialState", () => {
		let state = seasonReducer(undefined, {
			type: types.SEASONS_SET_IDS,
			payload: seasonIdsData,
		});

		state = seasonReducer(state, {
			type: types.SEASONS_FETCH_IDS,
		});

		expect(state).toEqual(initialState);
	});

	it("sets a single season's data for editing", () => {
		const state = seasonReducer(undefined, {
			type: types.SEASONS_SET_EDIT,
			payload: seasonData,
		});

		expect(state).toEqual({
			data: [],
			editSeason: mocks.seasonsData,
			ids: [],
			isLoading: true,
			totalDocs: 0,
		});
	});

	it("sets season's ids", () => {
		const state = seasonReducer(undefined, {
			type: types.SEASONS_SET_IDS,
			payload: seasonIdsData,
		});

		expect(state).toEqual({
			data: [],
			editSeason: {},
			ids: mocks.seasonIdsData,
			isLoading: true,
			totalDocs: 0,
		});
	});
});
