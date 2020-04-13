import Router from "next/router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import app from "~utils/axiosConfig";
import * as actions from "~actions/Members";
import { resetServerMessage, setServerMessage } from "~actions/Messages";
import { signoutUser, updateUser } from "~actions/Auth";
import * as sagas from "~sagas/Members";
import * as mocks from "~sagas/__mocks__/sagas.mocks";
import messageReducer from "~reducers/Messages";
import memberReducer from "~reducers/Members";
import { parseData, parseMessage } from "~utils/parseResponse";
import { selectQuery } from "~utils/selectors";
import toast from "~components/Body/Toast";

const memberId = "124567890";
const tokenId = "0123456789";
const ids = mocks.ids;

describe("Member Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Create Member", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully created a new member!";
			props = mocks.newMember;
		});

		it("logical flow matches pattern for a create member request", () => {
			const res = { data: { message } };

			testSaga(sagas.createMember, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.post, "token/create", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.call(Router.push, "/employee/members/authorizations/viewall?page=1")
				.next()
				.isDone();
		});

		it("successfully creates a new member", async () => {
			mockApp.onPost("token/create").reply(200, { message });

			return expectSaga(sagas.createMember, { props })
				.dispatch(actions.createMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new member authorization.";
			mockApp.onPost("token/create").reply(404, { err });

			return expectSaga(sagas.createMember, { props })
				.dispatch(actions.createMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Member", () => {
		it("logical flow matches pattern for delete member requests", () => {
			const message = "Successfully deleted member.";
			const res = { data: { message } };

			testSaga(sagas.deleteMember, { memberId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `member/delete/${memberId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchMembers())
				.next()
				.isDone();
		});

		it("successfully deletes a member", async () => {
			const message = "Successfully deleted the member.";
			mockApp.onDelete(`member/delete/${memberId}`).reply(200, { message });

			return expectSaga(sagas.deleteMember, { memberId })
				.dispatch(actions.deleteMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onDelete(`member/delete/${memberId}`).reply(404, { err });

			return expectSaga(sagas.deleteMember, { memberId })
				.dispatch(actions.deleteMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Many Members", () => {
		it("logical flow matches pattern for delete many members requests", () => {
			const message = "Successfully deleted the members.";
			const res = { data: { message } };

			testSaga(sagas.deleteManyMembers, { ids })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `members/delete-many`, { data: { ids } })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchMembers())
				.next()
				.isDone();
		});

		it("successfully deletes many members", async () => {
			const message = "Successfully deleted the members.";
			mockApp.onDelete(`members/delete-many`).reply(200, { message });

			return expectSaga(sagas.deleteManyMembers, { ids })
				.dispatch(actions.deleteManyMembers)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the event.";
			mockApp.onDelete(`members/delete-many`).reply(404, { err });

			return expectSaga(sagas.deleteManyMembers, { ids })
				.dispatch(actions.deleteManyMembers)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Token", () => {
		it("logical flow matches pattern for delete member token requests", () => {
			const message = "Successfully deleted member authorization token.";
			const res = { data: { message } };

			testSaga(sagas.deleteToken, { tokenId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `token/delete/${tokenId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchTokens())
				.next()
				.isDone();
		});

		it("successfully deletes a member token", async () => {
			const message = "Successfully deleted the member token.";
			mockApp.onDelete(`token/delete/${tokenId}`).reply(200, { message });

			return expectSaga(sagas.deleteToken, { tokenId })
				.dispatch(actions.deleteToken)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onDelete(`token/delete/${tokenId}`).reply(404, { err });

			return expectSaga(sagas.deleteToken, { tokenId })
				.dispatch(actions.deleteToken)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Delete Many Tokens", () => {
		it("logical flow matches pattern for delete many tokens requests", () => {
			const message = "Successfully deleted the tokens.";
			const res = { data: { message } };

			testSaga(sagas.deleteManyTokens, { ids })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.delete, `tokens/delete-many`, { data: { ids } })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchTokens())
				.next()
				.isDone();
		});

		it("successfully deletes many tokens", async () => {
			const message = "Successfully deleted the tokens.";
			mockApp.onDelete(`tokens/delete-many`).reply(200, { message });

			return expectSaga(sagas.deleteManyTokens, { ids })
				.dispatch(actions.deleteManyTokens)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the event.";
			mockApp.onDelete(`tokens/delete-many`).reply(404, { err });

			return expectSaga(sagas.deleteManyTokens, { ids })
				.dispatch(actions.deleteManyTokens)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Members Availability", () => {
		let data;
		let params;
		beforeEach(() => {
			data = { memberAvailability: mocks.memberAvailability };
			params = {
				id: "0123456789",
			};
		});

		it("logical flow matches pattern for fetch member availability requests", () => {
			const res = { data };

			testSaga(sagas.fetchAvailability, { params })
				.next()
				.call(app.get, "member/availability", { params })
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setMemberAvailability(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches member availability for viewing", async () => {
			mockApp.onGet("member/availability").reply(200, data);

			return expectSaga(sagas.fetchAvailability, { params })
				.dispatch(actions.fetchAvailability)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: [],
					editToken: {},
					names: [],
					viewMember: {},
					eventResponses: [],
					memberAvailability: { memberAvailability: mocks.memberAvailability },
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch member availability.";
			mockApp.onGet("member/availability").reply(404, { err });

			return expectSaga(sagas.fetchAvailability, { params })
				.dispatch(actions.fetchAvailability)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Profile", () => {
		let basicMemberInfo;
		let memberAvailability;
		beforeEach(() => {
			basicMemberInfo = { member: mocks.membersData };
			memberAvailability = { memberAvailability: mocks.memberAvailability };
		});

		it("logical flow matches pattern for fetch member requests", () => {
			const res = { basicMemberInfo };
			const res2 = { memberAvailability };
			const params = { params: { id: memberId } };

			testSaga(sagas.fetchProfile, { memberId })
				.next()
				.call(app.get, `member/review/${memberId}`)
				.next(res)
				.call(parseData, res)
				.next(res.basicMemberInfo)
				.call(app.get, "member/availability", params)
				.next(res2)
				.call(parseData, res2)
				.next(res2.memberAvailability)
				.put(
					actions.setMemberToReview({
						...res.basicMemberInfo,
						memberAvailability,
					}),
				)
				.next()
				.isDone();
		});

		it("successfully fetches an existing member", async () => {
			mockApp.onGet(`member/review/${memberId}`).reply(200, basicMemberInfo);
			mockApp.onGet("member/availability").reply(200, memberAvailability);

			return expectSaga(sagas.fetchProfile, { memberId })
				.dispatch(actions.fetchMember)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: [],
					editToken: {},
					names: [],
					viewMember: mocks.membersData,
					eventResponses: [],
					memberAvailability,
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", () => {
			const err = "Unable to fetch that member.";
			mockApp.onGet(`member/review/${memberId}`).reply(404, { err });

			return expectSaga(sagas.fetchProfile, { memberId })
				.dispatch(actions.fetchMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Members Events", () => {
		let data;
		let params;
		beforeEach(() => {
			data = { eventResponses: mocks.eventResponseData };
			params = {
				memberid: "0123456789",
				selectedDate: "2019-12-17T01:00:00-08:00",
			};
		});

		it("logical flow matches pattern for fetch member events requests", () => {
			const res = { data };

			testSaga(sagas.fetchMemberEvents, { params })
				.next()
				.call(app.get, "member/events", { params })
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setMemberEventsByDate(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches member events for viewing", async () => {
			mockApp.onGet("member/events").reply(200, data);

			return expectSaga(sagas.fetchMemberEvents, { params })
				.dispatch(actions.fetchMemberEvents)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: [],
					editToken: {},
					names: [],
					viewMember: {},
					eventResponses: mocks.eventResponseData,
					memberAvailability: {},
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch member events.";
			mockApp.onGet("member/events").reply(404, { err });

			return expectSaga(sagas.fetchMemberEvents, { params })
				.dispatch(actions.fetchMemberEvents)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Members", () => {
		let data;
		let query;
		beforeEach(() => {
			data = { members: mocks.membersData, totalDocs: 1 };
			query = "?page=1";
		});

		it("logical flow matches pattern for fetch members requests", () => {
			const res = { data };

			testSaga(sagas.fetchMembers)
				.next()
				.select(selectQuery)
				.next()
				.call(app.get, `members/allundefined`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setMembers(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a member for editing", async () => {
			mockApp.onGet(`members/all${query}`).reply(200, data);

			return expectSaga(sagas.fetchMembers)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchMembers)
				.withReducer(memberReducer)
				.hasFinalState({
					data: mocks.membersData,
					isLoading: false,
					totalDocs: 1,
					tokens: [],
					editToken: {},
					names: [],
					viewMember: {},
					eventResponses: [],
					memberAvailability: {},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch members.";
			mockApp.onGet(`members/all${query}`).reply(404, { err });

			return expectSaga(sagas.fetchMembers)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchMembers)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Member's Settings", () => {
		let basicMemberInfo;
		let memberAvailability;
		beforeEach(() => {
			basicMemberInfo = { member: mocks.memberData };
			memberAvailability = { memberAvailability: mocks.memberAvailability };
		});

		it("logical flow matches pattern for fetch member's settings requests", () => {
			const res = { basicMemberInfo };
			const res2 = { memberAvailability };

			testSaga(sagas.fetchSettings)
				.next()
				.call(app.get, "member/settings")
				.next(res)
				.call(parseData, res)
				.next(res.basicMemberInfo)
				.call(app.get, "member/settings/availability")
				.next(parseData, res2)
				.next(res2.memberAvailability)
				.put(
					updateUser({
						firstName: res.basicMemberInfo.member.firstName,
						lastName: res.basicMemberInfo.member.lastName,
					}),
				)
				.next()
				.put(
					actions.setMemberToReview({
						...res.basicMemberInfo,
						memberAvailability: res2.memberAvailability,
					}),
				)
				.next()
				.isDone();
		});

		it("successfully fetches a member's settings", async () => {
			mockApp.onGet("member/settings").reply(200, basicMemberInfo);
			mockApp
				.onGet("member/settings/availability")
				.reply(200, memberAvailability);

			return expectSaga(sagas.fetchSettings)
				.dispatch(actions.fetchSettings)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: [],
					editToken: {},
					names: [],
					viewMember: mocks.memberData,
					eventResponses: [],
					memberAvailability,
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch member's availability.";
			mockApp.onGet("member/settings").reply(404, { err });

			return expectSaga(sagas.fetchSettings)
				.dispatch(actions.fetchSettings)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Member's Settings Availability", () => {
		let data;
		let params;
		beforeEach(() => {
			data = mocks.memberAvailability;
			params = { id: "0123456789", selectedDate: "2019-10-01T00:00:00-07:00" };
		});

		it("logical flow matches pattern for fetch member's settings availability requests", () => {
			const res = { data };

			testSaga(sagas.fetchSettingsAvailability, { params })
				.next()
				.call(app.get, "member/settings/availability", { params })
				.next(parseData, res)
				.next(res.data)
				.put(actions.setMemberAvailability(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a member's settings availability", async () => {
			mockApp.onGet("member/settings/availability").reply(200, data);

			return expectSaga(sagas.fetchSettingsAvailability, { params })
				.dispatch(actions.fetchSettingsAvailability)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: [],
					editToken: {},
					names: [],
					viewMember: {},
					eventResponses: [],
					memberAvailability: data,
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch member's availability.";
			mockApp.onGet("member/settings/availability").reply(404, { err });

			return expectSaga(sagas.fetchSettingsAvailability, { params })
				.dispatch(actions.fetchSettingsAvailability)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Member's Settings Event Responses", () => {
		let data;
		let params;
		beforeEach(() => {
			data = mocks.eventResponseData;
			params = {
				id: "0123456789",
				selectedDate: "2019-10-01T00:00:00-07:00",
				selectedGames: "All Games",
			};
		});

		it("logical flow matches pattern for fetch member's settings event responses requests", () => {
			const res = { data };

			testSaga(sagas.fetchMemberSettingsEvents, { params })
				.next()
				.call(app.get, "member/settings/events", { params })
				.next(parseData, res)
				.next(res.data)
				.put(actions.setMemberEventsByDate(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a member's settings event responses", async () => {
			mockApp.onGet("member/settings/events").reply(200, data);

			return expectSaga(sagas.fetchMemberSettingsEvents, { params })
				.dispatch(actions.fetchMemberSettingsEvents)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: [],
					editToken: {},
					names: [],
					viewMember: {},
					eventResponses: mocks.eventResponses,
					memberAvailability: {},
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch member's event responses.";
			mockApp.onGet("member/settings/events").reply(404, { err });

			return expectSaga(sagas.fetchMemberSettingsEvents, { params })
				.dispatch(actions.fetchMemberSettingsEvents)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Token", () => {
		let tokenData;
		let seasonData;
		beforeEach(() => {
			tokenData = { token: mocks.tokensData };
			seasonData = { seasonIds: mocks.seasonIdsData };
		});

		it("logical flow matches pattern for fetch member token requests", () => {
			const res = { tokenData };
			const res2 = { seasonData };

			testSaga(sagas.fetchToken, { tokenId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.get, `token/edit/${tokenId}`)
				.next(res)
				.call(parseData, res)
				.next(res.tokenData)
				.call(app.get, "seasons/all/ids")
				.next(res2)
				.call(parseData, res2)
				.next(res2.seasonData)
				.put(
					actions.setToken({
						...res.tokenData.token,
						seasonIds: res2.seasonData.seasonIds,
					}),
				)
				.next()
				.isDone();
		});

		it("successfully fetches a member token for editing", async () => {
			mockApp.onGet(`token/edit/${tokenId}`).reply(200, tokenData);
			mockApp
				.onGet("seasons/all/ids")
				.reply(200, { data: { seasonIds: mocks.seasonIdsData } });

			return expectSaga(sagas.fetchToken, { tokenId })
				.dispatch(actions.fetchToken)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: [],
					editToken: { ...mocks.tokensData, seasonIds: mocks.seasonIds },
					names: [],
					viewMember: {},
					eventResponses: [],
					memberAvailability: {},
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch that token.";
			mockApp.onGet(`token/edit/${tokenId}`).reply(404, { err });

			return expectSaga(sagas.fetchToken, { tokenId })
				.dispatch(actions.fetchToken)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Fetch Tokens", () => {
		let data;
		let query;
		beforeEach(() => {
			data = { tokens: mocks.tokensData, totalDocs: 1 };
			query = "?page=1";
		});

		it("logical flow matches pattern for fetch member tokens requests", () => {
			const res = { data };

			testSaga(sagas.fetchTokens)
				.next()
				.select(selectQuery)
				.next()
				.call(app.get, `tokens/allundefined`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setTokens(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a member for editing", async () => {
			mockApp.onGet(`tokens/all${query}`).reply(200, data);

			return expectSaga(sagas.fetchTokens)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchTokens)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: mocks.tokensData,
					isLoading: false,
					totalDocs: 1,
					editToken: {},
					names: [],
					viewMember: {},
					eventResponses: [],
					memberAvailability: {},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch tokens.";
			mockApp.onGet(`tokens/all${query}`).reply(404, { err });

			return expectSaga(sagas.fetchTokens)
				.provide([[matchers.select.selector(selectQuery), query]])
				.dispatch(actions.fetchTokens)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Resend Token", () => {
		it("logical flow matches pattern for resend member token requests", () => {
			const message = "Successfully sent another member authorization token.";
			const res = { data: { message } };

			testSaga(sagas.resendToken, { tokenId })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, `token/resend/${tokenId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "info", message: res.data.message })
				.next()
				.put(actions.fetchTokens())
				.next()
				.isDone();
		});

		it("successfully resends a member token", async () => {
			const message = "Successfully resent the member token.";
			mockApp.onPut(`token/resend/${tokenId}`).reply(200, { message });

			return expectSaga(sagas.resendToken, { tokenId })
				.dispatch(actions.resendToken)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onPut(`token/resend/${tokenId}`).reply(404, { err });

			return expectSaga(sagas.resendToken, { tokenId })
				.dispatch(actions.resendToken)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Update Member", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the member!";
			props = mocks.membersData;
		});

		it("logical flow matches pattern for update member requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateMember, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "member/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "info", message: res.data.message })
				.next(props)
				.put(actions.fetchMember(props._id))
				.next()
				.isDone();
		});

		it("successfully updates a member", async () => {
			mockApp.onPut("member/update").reply(200, { message });

			return expectSaga(sagas.updateMember, { props })
				.dispatch(actions.updateMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onPut("member/update").reply(404, { err });

			return expectSaga(sagas.updateMember, { props })
				.dispatch(actions.updateMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Update Member Status", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the member!";
			props = mocks.membersData;
		});

		it("logical flow matches pattern for update member status requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateMemberStatus, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "member/updatestatus", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "info", message: res.data.message })
				.next(props)
				.put(actions.fetchMember(props._id))
				.next()
				.isDone();
		});

		it("successfully updates a member status", async () => {
			mockApp.onPut("member/updatestatus").reply(200, { message });

			return expectSaga(sagas.updateMemberStatus, { props })
				.dispatch(actions.updateMemberStatus)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onPut("member/updatestatus").reply(404, { err });

			return expectSaga(sagas.updateMemberStatus, { props })
				.dispatch(actions.updateMemberStatus)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Update Member Token", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the member token!";
			props = mocks.tokensData;
		});

		it("logical flow matches pattern for update member token requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateMemberToken, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "token/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "info", message: res.data.message })
				.next()
				.call(Router.back)
				.next()
				.isDone();
		});

		it("successfully updates a member status", async () => {
			mockApp.onPut("token/update").reply(200, { message });

			return expectSaga(sagas.updateMemberToken, { props })
				.dispatch(actions.updateMemberToken, { props })
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onPut("token/update").reply(404, { err });

			return expectSaga(sagas.updateMemberToken, { props })
				.dispatch(actions.updateMemberToken, { props })
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});

	describe("Update Member's Settings", () => {
		let props;
		beforeEach(() => {
			props = mocks.memberSettings;
		});

		it("logical flow matches pattern for updating crucial member's settings requests", () => {
			const message =
				"Your emember has changed, please log out and log in with your new emember.";
			const res = { data: { message } };

			testSaga(sagas.updateSettings, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "member/settings/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(signoutUser())
				.next()
				.isDone();
		});

		it("logical flow matches pattern for updating non-crucial member's settings requests", () => {
			const message = "Successfully updated your settings.";
			const res = { data: { message } };

			testSaga(sagas.updateSettings, { props })
				.next()
				.put(resetServerMessage())
				.next()
				.call(app.put, "member/settings/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ message: res.data.message }))
				.next(res.data.message)
				.call(toast, { type: "success", message: res.data.message })
				.next()
				.put(actions.fetchMemberSettings())
				.next()
				.isDone();
		});

		it("successfully updates a member's settings", async () => {
			const message = "Successfully updated your settings.";
			mockApp.onPut("member/settings/update").reply(200, { message });

			return expectSaga(sagas.updateSettings, { props })
				.dispatch(actions.updateSettings)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to update the member's settings.";
			mockApp.onPut("member/settings/update").reply(404, { err });

			return expectSaga(sagas.updateSettings, { props })
				.dispatch(actions.updateSettings)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
				})
				.run();
		});
	});
});
