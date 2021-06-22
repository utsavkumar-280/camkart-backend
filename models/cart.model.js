const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: "User id is required",
		},
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					quantity: Number,
					isActive: Boolean,
				},
			},
		],
		address: {
			type: Schema.Types.ObjectId,
			ref: "Address",
			required: "Address id is required",
		},
	},
	{
		timestamps: true,
	}
);

const Cart = model("Cart", CartSchema);

module.exports = { Cart };
