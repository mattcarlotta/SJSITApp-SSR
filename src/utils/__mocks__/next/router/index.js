jest.mock("next/router", () => ({
	...require.requireActual("next/router"),
	push: jest.fn(),
	replace: jest.fn(),
}));
module.exports = require.requireMock("next/router");
