const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema, model } = require("mongoose");

// NHL/AHL teams
const teamSchema = new Schema({
	league: { type: String, required: true },
	team: { type: String, unique: true },
	name: { type: String, unique: true, lowercase: true },
});

teamSchema.plugin(mongoosePaginate);

module.exports = model("Team", teamSchema);
