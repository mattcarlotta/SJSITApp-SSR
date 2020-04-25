jest.mock("antd/es/transfer", () => require.requireActual("antd/lib/transfer"));

module.exports = require.requireMock("antd/es/transfer");
