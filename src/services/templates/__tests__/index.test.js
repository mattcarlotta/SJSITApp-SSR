import {
	newUserTemplate,
	newPasswordTemplate,
	newAuthorizationKeyTemplate,
} from "~services/templates";

describe("Default Strategy Templates Exports", () => {
	it("exports newUserTemplate", () => {
		expect(newUserTemplate).toBeDefined();
	});

	it("exports newPasswordTemplate", () => {
		expect(newPasswordTemplate).toBeDefined();
	});

	it("exports newAuthorizationKeyTemplate", () => {
		expect(newAuthorizationKeyTemplate).toBeDefined();
	});
});
