const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema, model } = require("mongoose");

// current season year
const seasonSchema = new Schema({
	seasonId: { type: String, unique: true, lowercase: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
});

seasonSchema.plugin(mongoosePaginate);

module.exports = model("Season", seasonSchema);
