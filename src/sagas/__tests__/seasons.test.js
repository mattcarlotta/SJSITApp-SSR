import Router from "next/router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import app from "~utils/axiosConfig";
import * as actions from "~actions/Seasons";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import * as sagas from "~sagas/Seasons";
import * as mocks from "~sagas/__mocks__/sagas.mocks";
import messageReducer from "~reducers/Messages";
import seasonReducer from "~reducers/Seasons";
import { parseData, parseMessage } from "~utils/parseResponse";
import { selectQuery } from "~utils/selectors";
import toast from "~components/Body/Toast";

const seasonId = "124567890";
const ids = mocks.ids;

describe("Season Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Create Season", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully created a new season!";
			props = mocks.newSeason;
		});

		it("logical flow matches pattern for a create season request", () => {
			const res = { data: { message } };

			testSaga(sagas.createSeason, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.post, "season/create", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.call(Router.push, "/employee/seasons/viewall?page=1")
				.next()
				.isDone();
		});

		it("successfully creates a new season", async () => {
			mockApp.onPost("season/create").reply(200, { message });

			return expectSaga(sagas.createSeason, { props })
				.dispatch(actions.createSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new season.";
			mockApp.onPost("season/create").reply(404, { err });

			return expectSaga(sagas.createSeason, { props })
				.dispatch(actions.createSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Season", () => {
		it("logical flow matches pattern for delete season requests", () => {
			const message = "Successfully deleted season.";
			const res = { data: { message } };

			testSaga(sagas.deleteSeason, { seasonId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `season/delete/${seasonId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchSeasons())
				.next()
				.isDone();
		});

		it("successfully deletes a season", async () => {
			const message = "Successfully deleted the season.";
			mockApp.onDelete(`season/delete/${seasonId}`).reply(200, { message });

			return expectSaga(sagas.deleteSeason, { seasonId })
				.dispatch(actions.deleteSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the season.";
			mockApp.onDelete(`season/delete/${seasonId}`).reply(404, { err });

			return expectSaga(sagas.deleteSeason, { seasonId })
				.dispatch(actions.deleteSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Many Seasons", () => {
		it("logical flow matches pattern for delete many seasons requests", () => {
			const message = "Successfully deleted the seasons.";
			const res = { data: { message } };

			testSaga(sagas.deleteManySeasons, { ids })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `seasons/delete-many`, { data: { ids } })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchSeasons())
				.next()
				.isDone();
		});

		it("successfully deletes many seasons", async () => {
			const message = "Successfully deleted the seasons.";
			mockApp.onDelete(`seasons/delete-many`).reply(200, { message });

			return expectSaga(sagas.deleteManySeasons, { ids })
				.dispatch(actions.deleteManySeasons)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the event.";
			mockApp.onDelete(`seasons/delete-many`).reply(404, { err });

			return expectSaga(sagas.deleteManySeasons, { ids })
				.dispatch(actions.deleteManySeasons)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Seasons", () => {
		let data;
		let query;
		beforeEach(() => {
			data = { seasons: mocks.seasonsData, totalDocs: 1 };
			query = "?page=1";
		});

		it("logical flow matches pattern for fetch seasons requests", () => {
			const res = { data };

			testSaga(sagas.fetchSeasons)
				.next()
				.select(selectQuery)
				.next()
				.call(app.get, `seasons/allundefined`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setSeasons(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a season for editing", async () => {
			mockApp.onGet(`seasons/all${query}`).reply(200, data);

			return expectSaga(sagas.fetchSeasons)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchSeasons)
				.withReducer(seasonReducer)
				.hasFinalState({
					data: mocks.seasonsData,
					isLoading: false,
					totalDocs: 1,
					editSeason: {},
					ids: [],
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new season.";
			mockApp.onGet(`seasons/all${query}`).reply(404, { err });

			return expectSaga(sagas.fetchSeasons)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchSeasons)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Season Ids", () => {
		let data;
		beforeEach(() => {
			data = { seasonIds: mocks.seasonIdsData };
		});

		it("logical flow matches pattern for fetch seasons requests", () => {
			const res = { data };

			testSaga(sagas.fetchSeasonsIds)
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.get, "seasons/all/ids")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setSeasonsIds(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a season for editing", async () => {
			mockApp.onGet("seasons/all/ids").reply(200, data);

			return expectSaga(sagas.fetchSeasonsIds)
				.dispatch(actions.fetchSeasonsIds)
				.withReducer(seasonReducer)
				.hasFinalState({
					data: [],
					editSeason: {},
					ids: mocks.seasonIdsData,
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to get season ids.";
			mockApp.onGet("seasons/all/ids").reply(404, { err });

			return expectSaga(sagas.fetchSeasonsIds)
				.dispatch(actions.fetchSeasonsIds)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Update Season", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the season!";
			props = mocks.newSeason;
		});

		it("logical flow matches pattern for update season requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateSeason, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "season/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.call(Router.back)
				.next()
				.isDone();
		});

		it("successfully updates a season", async () => {
			mockApp.onPut("season/update").reply(200, { message });

			return expectSaga(sagas.updateSeason, { props })
				.dispatch(actions.updateSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the season.";
			mockApp.onPut("season/update").reply(404, { err });

			return expectSaga(sagas.updateSeason, { seasonId })
				.dispatch(actions.updateSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});
});
