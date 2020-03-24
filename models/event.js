const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema, model } = require("mongoose");

// event
const eventSchema = new Schema({
	eventType: { type: String, default: "Game", required: true },
	eventDate: { type: Date, required: true },
	location: { type: String, default: "SAP Center at San Jose" },
	employeeResponses: [
		{
			_id: {
				type: Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			response: { type: String, required: true },
			notes: String,
		},
	],
	schedule: [
		{
			_id: { type: String, required: true },
			title: String,
			employeeIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
		},
	],
	scheduledIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
	seasonId: { type: String, required: true },
	team: { type: String, required: true },
	opponent: String,
	callTimes: { type: Array, of: Date, required: true },
	uniform: { type: String, default: "Sharks Teal Jersey" },
	notes: String,
	sentEmailReminders: { type: Boolean, default: false },
});

eventSchema.plugin(mongoosePaginate);

eventSchema.pre("save", function saveSchedule(next) {
	this.schedule = this.callTimes.map(time => ({
		_id: time,
		employeeIds: [],
	}));
	next();
});

module.exports = model("Event", eventSchema);
