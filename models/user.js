const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

// admin, staff, employee
const userSchema = new Schema({
	avatar: { type: String, default: "" },
	avatarPath: { type: String, default: "" },
	email: {
		type: String,
		unique: true,
		lowercase: true,
	},
	role: { type: String, default: "employee" },
	status: { type: String, default: "active" },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	registered: {
		type: Date,
		required: true,
	},
	token: { type: String, unique: true },
	emailReminders: { type: Boolean, default: true },
});

userSchema.plugin(mongoosePaginate);

userSchema.statics.createUser = function newUser(user) {
	return this.create(user);
};

// Generate a salt, password, then run callback
userSchema.statics.createPassword = async function createNewPassword(password) {
	const salt = await bcrypt.genSalt(12);
	const newPassword = await bcrypt.hash(password, salt, null);
	return newPassword;
};

// Set a compare password method on the model
userSchema.methods.comparePassword = async function compareNewPassword(
	incomingPassword,
) {
	const isMatch = await bcrypt.compare(incomingPassword, this.password);
	return isMatch;
};

module.exports = model("User", userSchema);
