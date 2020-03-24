import * as types from "types";
import * as actions from "actions/Seasons";

const data = {
	_id: "5d323ee2b02dee15483e5d9f",
	members: 3,
	seasonId: "20002001",
	startDate: "2000-10-06T07:00:00.000+00:00",
	endDate: "2001-08-06T07:00:00.000+00:00",
};

const seasonsData = { seasons: [data] };

const seasonData = { season: [data] };

const seasonIdsData = { seasonIds: ["20002001", "20012002", "20022003"] };

describe("Season Actions", () => {
	it("returns SEASONS_CREATE with props", () => {
		const props = { seasonId: "1234", startDate: "1234", endDate: "1234" };

		const value = actions.createSeason(props);

		expect(value).toEqual({
			type: types.SEASONS_CREATE,
			props,
		});
	});

	it("returns SEASONS_DELETE with a seasonId", () => {
		const seasonId = "20052006";

		const value = actions.deleteSeason(seasonId);

		expect(value).toEqual({
			type: types.SEASONS_DELETE,
			seasonId,
		});
	});

	it("returns SEASONS_DELETE_MANY with ids", () => {
		const ids = ["01", "02", "03"];
		const value = actions.deleteManySeasons(ids);

		expect(value).toEqual({
			type: types.SEASONS_DELETE_MANY,
			ids,
		});
	});

	it("returns SEASONS_EDIT", () => {
		const seasonId = "20052006";

		const value = actions.fetchSeason(seasonId);

		expect(value).toEqual({
			type: types.SEASONS_EDIT,
			seasonId,
		});
	});

	it("returns SEASONS_FETCH", () => {
		const value = actions.fetchSeasons();

		expect(value).toEqual({
			type: types.SEASONS_FETCH,
		});
	});

	it("returns SEASONS_SET with data", () => {
		const value = actions.setSeasons(seasonsData);

		expect(value).toEqual({
			type: types.SEASONS_SET,
			payload: seasonsData,
		});
	});

	it("returns SEASONS_SET with an empty array if data is empty", () => {
		const data = {};

		const value = actions.setSeasons(data);

		expect(value).toEqual({
			type: types.SEASONS_SET,
			payload: [],
		});
	});

	it("returns SEASONS_SET_IDS with data", () => {
		const value = actions.setSeasonsIds(seasonIdsData);

		expect(value).toEqual({
			type: types.SEASONS_SET_IDS,
			payload: seasonIdsData,
		});
	});

	it("returns SEASONS_SET_IDS with an empty array if data is empty", () => {
		const data = {};

		const value = actions.setSeasonsIds(data);

		expect(value).toEqual({
			type: types.SEASONS_SET_IDS,
			payload: [],
		});
	});

	it("returns SEASONS_SET_EDIT with data", () => {
		const value = actions.setSeasonToEdit(seasonData);

		expect(value).toEqual({
			type: types.SEASONS_SET_EDIT,
			payload: seasonData,
		});
	});

	it("returns SEASONS_SET_EDIT with an empty object if data is empty", () => {
		const data = {};

		const value = actions.setSeasonToEdit(data);

		expect(value).toEqual({
			type: types.SEASONS_SET_EDIT,
			payload: {},
		});
	});

	it("returns SEASONS_UPDATE_EDIT with props", () => {
		const props = {
			id: "1234567890",
			seasonId: "20052006",
			startDate: "2005-10-06T07:00:00.000+00:00",
			endDate: "2006-08-06T07:00:00.000+00:00",
		};

		const value = actions.updateSeason(props);

		expect(value).toEqual({
			type: types.SEASONS_UPDATE_EDIT,
			props,
		});
	});
});
