const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema, model } = require("mongoose");

// email
const mailSchema = new Schema({
	message: { type: String, required: true },
	sendTo: [{ type: String, required: true }],
	sendFrom: { type: String, required: true },
	sendDate: {
		type: Date,
		required: true,
	},
	status: { type: String, default: "unsent" },
	subject: { type: String, required: true },
});

mailSchema.plugin(mongoosePaginate);

module.exports = model("Mail", mailSchema);
