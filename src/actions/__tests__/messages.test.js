import * as types from "types";
import * as actions from "actions/Messages";

describe("Message Actions", () => {
	it("returns MESSAGE_HIDE", () => {
		const value = actions.hideServerMessage();

		expect(value).toEqual({ type: types.MESSAGE_HIDE });
	});

	it("returns MESSAGE_RESET", () => {
		const value = actions.resetServerMessage();

		expect(value).toEqual({ type: types.MESSAGE_RESET });
	});

	it("returns MESSAGE_SET with a type and message", () => {
		const payload = {
			type: "error",
			message: "Invalid request.",
		};

		const value = actions.setServerMessage(payload);

		expect(value).toEqual({ type: types.MESSAGE_SET, payload });
	});
});
