import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";

// current season year
const seasonSchema = new Schema({
	seasonId: { type: String, unique: true, lowercase: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
});

seasonSchema.plugin(mongoosePaginate);

export default model("Season", seasonSchema);
