const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const WishlistSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	products: [
		{
			product: {
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
			isActive: Boolean,
		},
	],
});

const Wishlist = model("Wishlist", WishlistSchema);

module.exports = { Wishlist };
