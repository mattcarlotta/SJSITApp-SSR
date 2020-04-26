jest.mock("antd/es/table", () => require.requireActual("antd/lib/table"));

module.exports = require.requireMock("antd/es/table");
