import { expectSaga, testSaga } from "redux-saga-test-plan";
import { app } from "~utils";
import * as actions from "~actions/Teams";
import * as sagas from "~sagas/Teams";
import * as mocks from "~sagas/__mocks__/sagas.mocks";
import messageReducer from "~reducers/Messages";
import teamsReducer from "~reducers/Teams";
import { parseData } from "~utils/parseResponse";

describe("Teams Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Get All Teams", () => {
		let data;
		beforeEach(() => {
			data = { names: mocks.teams };
		});

		it("logical flow matches pattern for a create season request", () => {
			const res = { data };

			testSaga(sagas.fetchTeamNames)
				.next()
				.call(app.get, "teams/all/names")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setTeamNames(res.data))
				.next()
				.isDone();
		});

		it("successfully gets all teams", async () => {
			mockApp.onGet("teams/all/names").reply(200, data);

			return expectSaga(sagas.fetchTeamNames)
				.dispatch(actions.fetchTeamNames)
				.withReducer(teamsReducer)
				.hasFinalState({ data: mocks.teams })
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to get all teams.";
			mockApp.onGet("teams/all/names").reply(404, { err });

			return expectSaga(sagas.fetchTeamNames)
				.dispatch(actions.fetchTeamNames)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});
});
