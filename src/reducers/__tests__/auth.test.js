import * as types from "types";
import authReducer, { initialState } from "~reducers/Auth";
import * as mocks from "~reducers/__mocks__/reducers.mocks";

describe("Auth Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(authReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("toggles sidebar state", () => {
		const state = authReducer(undefined, {
			type: types.types.USER_SET_SIDEBAR_STATE,
		});
		expect(state).toEqual({ ...mocks.userSession, isCollapsed: true });
	});

	it("stores a signed in user", () => {
		const state = authReducer(undefined, {
			type: types.USER_SIGNIN,
			payload: mocks.userSession,
		});
		expect(state).toEqual(mocks.userSession);
	});

	it("removes a signed in user", () => {
		let state = authReducer(undefined, {
			type: types.USER_SIGNIN,
			payload: mocks.userSession,
		});
		expect(state).toEqual(mocks.userSession);

		state = authReducer(state, { type: types.USER_SIGNOUT });

		expect(state).toEqual(initialState);
	});
});
