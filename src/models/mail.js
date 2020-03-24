import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";

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

export default model("Mail", mailSchema);
