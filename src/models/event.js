import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";
import { createSchedule } from "~utils/helpers";

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

eventSchema.pre("save", function (next) {
	this.schedule = createSchedule(this.callTimes);
	next();
});

export default model("Event", eventSchema);
