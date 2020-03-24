import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";

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

export default model("Form", formSchema);
