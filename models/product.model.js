const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
	name: {
		type: String,
		required: "Name of the product is required",
	},

	img: {
		type: String,
	},

	category: {
		type: String,
		required: "Category of the product is required",
	},

	brand: {
		type: String,
		required: "Brand of the product is required",
	},

	price: {
		type: Number,
		required: "Price of the product is required",
	},

	oldPrice: {
		type: Number,
	},

	offer: {
		type: Number,
		default: 0,
	},

	inStock: {
		type: Boolean,
		required: true,
		default: true,
	},

	availability: {
		type: Number,
		required: "Available quantity of product required",
	},

	stars: {
		type: Number,
		default: 0,
	},

	reviews: {
		type: Number,
		default: 0,
	},
});

const Product = model("Product", ProductSchema);

module.exports = { Product };
