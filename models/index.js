/* istanbul ignore file */
const { model } = require("mongoose");

module.exports = {
	Event: model("Event"),
	Form: model("Form"),
	Mail: model("Mail"),
	Season: model("Season"),
	Team: model("Team"),
	Token: model("Token"),
	User: model("User"),
};
