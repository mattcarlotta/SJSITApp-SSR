const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema, model } = require("mongoose");

// monthly form
const formSchema = new Schema({
	startMonth: { type: Date, required: true },
	endMonth: { type: Date, required: true },
	expirationDate: { type: Date, required: true },
	seasonId: { type: String, required: true },
	sendEmailNotificationsDate: {
		type: Date,
		required: true,
	},
	sentEmails: { type: Boolean, default: false },
	notes: String,
});

formSchema.plugin(mongoosePaginate);

module.exports = model("Form", formSchema);
