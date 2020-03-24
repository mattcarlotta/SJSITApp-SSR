import * as types from "~types";
import memberReducer, { initialState } from "~reducers/Members";
import * as mocks from "~reducers/__mocks__/~reducers.mocks";

const membersData = {
	members: mocks.membersData,
	totalDocs: 1,
};

const memberData = {
	member: mocks.membersData,
	eventResponses: mocks.memberEventResponses,
	memberAvailability: mocks.memberAvailability,
};

const tokensData = {
	tokens: mocks.tokensData,
	totalDocs: 1,
};

const tokenData = {
	...mocks.tokensData,
	seasonIds: mocks.seasonIdsData,
};

const memberNamesData = {
	members: mocks.memberNamesData,
};

describe("Member Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(memberReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("resets members data", () => {
		let state = memberReducer(undefined, {
			type: types.MEMBERS_SET_REVIEW,
			payload: memberData,
		});

		state = memberReducer(state, {
			type: types.MEMBERS_RESET,
		});

		expect(state).toEqual({
			data: [],
			editToken: {},
			eventResponses: [],
			memberAvailability: {},
			names: [],
			viewMember: {},
			tokens: [],
			isLoading: true,
			totalDocs: 0,
		});
	});

	it("sets members data", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET,
			payload: membersData,
		});

		expect(state).toEqual({
			data: mocks.membersData,
			isLoading: false,
			totalDocs: 1,
			eventResponses: [],
			memberAvailability: {},
			names: [],
			editToken: {},
			viewMember: {},
			tokens: [],
		});
	});

	it("sets members availabilty", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_AVAILABILITY,
			payload: mocks.memberAvailability,
		});

		expect(state).toEqual({
			data: [],
			eventResponses: [],
			editToken: {},
			memberAvailability: mocks.memberAvailability,
			names: [],
			viewMember: {},
			tokens: [],
			isLoading: true,
			totalDocs: 0,
		});
	});

	it("sets members event response data", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_EVENTS,
			payload: { eventResponses: mocks.eventResponseData },
		});

		expect(state).toEqual({
			data: [],
			editToken: {},
			eventResponses: mocks.eventResponseData,
			names: [],
			memberAvailability: {},
			viewMember: {},
			tokens: [],
			isLoading: true,
			totalDocs: 0,
		});
	});

	it("sets members names data", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_NAMES,
			payload: memberNamesData,
		});

		expect(state).toEqual({
			data: [],
			editToken: {},
			eventResponses: [],
			memberAvailability: {},
			names: mocks.memberNamesData,
			viewMember: {},
			tokens: [],
			isLoading: true,
			totalDocs: 0,
		});
	});

	it("when fetching all members, resets to initialState", () => {
		let state = memberReducer(undefined, {
			type: types.MEMBERS_SET,
			payload: membersData,
		});

		state = memberReducer(state, {
			type: types.MEMBERS_FETCH,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching a member for viewing, resets to initialState", () => {
		let state = memberReducer(undefined, {
			type: types.MEMBERS_SET,
			payload: membersData,
		});

		state = memberReducer(state, {
			type: types.MEMBERS_REVIEW,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching for a single member token for editing, resets to initialState", () => {
		let state = memberReducer(undefined, {
			type: types.MEMBERS_SET_TOKEN,
			payload: tokenData,
		});

		state = memberReducer(state, {
			type: types.MEMBERS_FETCH_TOKEN,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching for all member tokens, resets to initialState", () => {
		let state = memberReducer(undefined, {
			type: types.MEMBERS_SET_TOKENS,
			payload: tokensData,
		});

		state = memberReducer(state, {
			type: types.MEMBERS_FETCH_TOKENS,
		});

		expect(state).toEqual(initialState);
	});

	it("sets member tokens for viewing", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_TOKENS,
			payload: tokensData,
		});

		expect(state).toEqual({
			data: [],
			editToken: {},
			eventResponses: [],
			memberAvailability: {},
			names: [],
			viewMember: {},
			tokens: mocks.tokensData,
			isLoading: false,
			totalDocs: 1,
		});
	});

	it("sets a single member token for editing", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_TOKEN,
			payload: tokenData,
		});

		expect(state).toEqual({
			data: [],
			editToken: { ...mocks.tokensData, seasonIds: mocks.seasonIdsData },
			eventResponses: [],
			memberAvailability: {},
			names: [],
			viewMember: {},
			tokens: [],
			isLoading: true,
			totalDocs: 0,
		});
	});

	it("sets a single member's data for viewing", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_REVIEW,
			payload: memberData,
		});

		expect(state).toEqual({
			data: [],
			editToken: {},
			eventResponses: [],
			memberAvailability: mocks.memberAvailability,
			names: [],
			viewMember: mocks.membersData,
			tokens: [],
			isLoading: true,
			totalDocs: 0,
		});
	});
});
