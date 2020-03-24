import Router from "next/router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { app } from "~utils";
import * as actions from "~actions/Auth";
import { hideServerMessage, setServerMessage } from "~actions/Messages";
import * as sagas from "~sagas/Auth";
import * as mocks from "~sagas/__mocks__/sagas.mocks";
import authReducer from "~reducers/Auth";
import messageReducer from "~reducers/Messages";
import { parseData, parseMessage } from "~utils/parseResponse";

describe("Auth Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Authenticate User", () => {
		it("logical flow matches pattern for a signed in session", () => {
			const res = { data: { ...mocks.userSession } };

			testSaga(sagas.authenticateUser)
				.next()
				.call(app.get, "signedin")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.signin(res.data))
				.next()
				.isDone();
		});

		it("logical flow matches pattern for a guest sign in", () => {
			const res = { data: { role: "guest" } };

			testSaga(sagas.authenticateUser)
				.next()
				.call(app.get, "signedin")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.signin(res.data))
				.next()
				.isDone();
		});

		it("sets the current signed in user from a session", async () => {
			mockApp.onGet("signedin").reply(200, mocks.userSession);

			return expectSaga(sagas.authenticateUser)
				.dispatch(actions.authenticateUser)
				.withReducer(authReducer)
				.hasFinalState(mocks.userSession)
				.run();
		});

		it("sets the current signed as a guest when no session is present", async () => {
			mockApp.onGet("signedin").reply(200, {});

			return expectSaga(sagas.authenticateUser)
				.dispatch(actions.authenticateUser)
				.withReducer(authReducer)
				.hasFinalState({
					id: "",
					email: "",
					firstName: "",
					lastName: "",
					role: "guest",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to automatically sign in";
			mockApp.onGet("signedin").reply(404, { err });

			return expectSaga(sagas.authenticateUser)
				.dispatch(actions.authenticateUser)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Reset User Password", () => {
		let props;
		beforeAll(() => {
			props = mocks.resetPassword;
		});

		it("logical flow matches pattern for a successful password reset request", () => {
			const message = "Successfully changed password.";
			const res = { data: { message } };

			testSaga(sagas.resetPassword, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.put, "reset-password", { ...mocks.resetPassword })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "info", message: res.data.message }))
				.next(res.data.message)
				.call(sagas.signoutUserSession)
				.next()
				.isDone();
		});

		it("successfully requests a password reset", async () => {
			const message =
				"A password reset email has been sent to test@example.com.";
			mockApp.onPut("reset-password").reply(200, { message });
			mockApp.onGet("signout").reply(200, { message });

			return expectSaga(sagas.resetPassword, { props })
				.dispatch(actions.resetPassword)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "info",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to automatically sign in";
			mockApp.onPut("reset-password").reply(404, { err });

			return expectSaga(sagas.resetPassword, { props })
				.dispatch(actions.resetPassword)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Signin User", () => {
		let props;
		beforeAll(() => {
			props = mocks.userSignin;
		});

		it("logical flow matches pattern for a new sign in session", () => {
			const res = { data: { ...mocks.userSession } };

			testSaga(sagas.signinUser, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.post, "signin", { ...props })
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.signin(res.data))
				.next()
				.isDone();
		});

		it("sets the current signed in user from a session", async () => {
			mockApp.onPost("signin").reply(200, mocks.userSession);

			return expectSaga(sagas.signinUser, { props })
				.dispatch(actions.signinUser)
				.withReducer(authReducer)
				.hasFinalState(mocks.userSession)
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to sign in.";
			mockApp.onPost("signin").reply(404, { err });

			return expectSaga(sagas.signinUser, { props })
				.dispatch(actions.signinUser)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Signout User", () => {
		it("logical flow matches pattern for a sign out session", () => {
			testSaga(sagas.signoutUserSession)
				.next()
				.call(app.get, "signout")
				.next()
				.put(actions.signout())
				.next()
				.call(Router.push, "/employee/login")
				.next()
				.isDone();
		});

		it("removes the current signed in user from the session", async () => {
			mockApp.onGet("signout").reply(200);

			return expectSaga(sagas.signoutUserSession)
				.dispatch(actions.signoutUser)
				.withReducer(authReducer)
				.hasFinalState({
					id: "",
					email: "",
					firstName: "",
					lastName: "",
					role: "",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to sign out.";
			mockApp.onGet("signout").reply(404, { err });

			return expectSaga(sagas.signoutUserSession)
				.dispatch(actions.signoutUser)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Signup User", () => {
		let props;
		beforeAll(() => {
			props = mocks.signupNewUser;
		});

		it("logical flow matches pattern for a new sign in session", () => {
			const message = "Welcome to the Ice Team!";
			const res = { data: { message } };

			testSaga(sagas.signupUser, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.post, "signup", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(push("/employee/login"))
				.next()
				.isDone();
		});

		it("creates a new user account", async () => {
			const message = "Welcome to the Ice Team!";
			mockApp.onPost("signup").reply(200, { message });

			return expectSaga(sagas.signupUser, { props })
				.dispatch(actions.signupUser)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to sign up.";
			mockApp.onPost("signup").reply(404, { err });

			return expectSaga(sagas.signupUser, { props })
				.dispatch(actions.signupUser)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Update Current User", () => {
		let props;
		beforeAll(() => {
			props = mocks.updateCurrentPassword;
		});

		it("logical flow matches pattern for a password update", () => {
			const message = "Your password has been reset!";
			const res = { data: { message } };

			testSaga(sagas.updateUserPassword, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.put, "new-password", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.call(sagas.signoutUserSession)
				.next()
				.isDone();
		});

		it("updates the current signed in user's password", async () => {
			const message = "Your password has been reset!";
			mockApp.onPut("new-password").reply(200, { message });
			mockApp.onGet("signout").reply(200, { message });

			return expectSaga(sagas.updateUserPassword, { props })
				.dispatch(actions.updateUserPassword)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to update your password.";
			mockApp.onPut("new-password").reply(404, { err });

			return expectSaga(sagas.updateUserPassword, { props })
				.dispatch(actions.updateUserPassword)
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
