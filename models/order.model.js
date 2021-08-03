const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema(
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
				},
				quantity: { type: Number, default: 1 },
			},
		],
		payment: {
			totalAmount: { type: Number, default: 0 },
		},
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

const Order = model("Order", OrderSchema);

module.exports = { Order };
