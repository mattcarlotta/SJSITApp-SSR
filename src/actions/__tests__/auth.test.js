import * as types from "types";
import * as actions from "actions/Auth";

describe("Authentication Actions", () => {
	it("returns USER_SIGNIN_SESSION", () => {
		const value = actions.authenticateUser();

		expect(value).toEqual({ type: types.USER_SIGNIN_SESSION });
	});

	it("returns USER_PASSWORD_RESET with props", () => {
		const props = { email: "test@example.com" };

		const value = actions.resetPassword(props);

		expect(value).toEqual({
			type: types.USER_PASSWORD_RESET,
			props,
		});
	});

	it("returns USER_SIGNIN with data", () => {
		const data = {
			id: "88",
			email: "test@example.com",
			firstName: "Test",
			lastName: "Example",
			role: "member",
		};

		const value = actions.signin(data);

		expect(value).toEqual({
			type: types.USER_SIGNIN,
			payload: data,
		});
	});

	it("returns USER_SIGNIN with guest role data", () => {
		const data = {};

		const value = actions.signin(data);

		expect(value).toEqual({
			type: types.USER_SIGNIN,
			payload: { role: "guest" },
		});
	});

	it("returns USER_SIGNIN_ATTEMPT with props", () => {
		const props = {
			id: "88",
			email: "test@example.com",
			firstName: "Test",
			lastName: "Example",
			role: "member",
		};

		const value = actions.signinUser(props);

		expect(value).toEqual({
			type: types.USER_SIGNIN_ATTEMPT,
			props,
		});
	});

	it("returns USER_SIGNOUT_SESSION", () => {
		const value = actions.signoutUser();

		expect(value).toEqual({ type: types.USER_SIGNOUT_SESSION });
	});

	it("returns USER_SIGNOUT", () => {
		const value = actions.signout();

		expect(value).toEqual({ type: types.USER_SIGNOUT });
	});

	it("returns USER_SIGNUP with props", () => {
		const props = {
			token: "88",
			email: "test@example.com",
			firstName: "Test",
			lastName: "Example",
			password: "password",
		};

		const value = actions.signupUser(props);

		expect(value).toEqual({
			type: types.USER_SIGNUP,
			props,
		});
	});

	it("returns USER_PASSWORD_UPDATE with props", () => {
		const props = {
			token: "88",
			password: "password",
		};

		const value = actions.updateUserPassword(props);

		expect(value).toEqual({
			type: types.USER_PASSWORD_UPDATE,
			props,
		});
	});
});
