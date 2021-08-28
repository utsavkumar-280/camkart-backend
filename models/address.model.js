const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AddressSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	fullName: {
		type: String,
		required: "Full name is required",
	},
	buildingName: {
		type: String,
		required: "Building Name is required",
	},
	pincode: {
		type: String,
		required: "Pincode is required",
	},
	city: {
		type: String,
		required: "City is required",
	},
	state: {
		type: String,
		required: "State is required",
	},
	phone: {
		type: String,
		required: "Phone number is required",
	},
});

const Address = model("Address", AddressSchema);

module.exports = { Address };
