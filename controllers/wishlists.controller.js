const { Wishlist } = require("../models/wishlist.model");

const getWishlist = async (req, res, next) => {
	try {
		const userId = req.user._id;
		const wishlist = await Wishlist.findOne({ userId });

		if (!wishlist) {
			const newWishlist = new Wishlist({ userId, products: [] });
			const savedNewWishlist = await newWishlist.save();
			req.wishlist = savedNewWishlist;
			console.log("1");
			next();
		} else {
			req.wishlist = wishlist;
			console.log("2");
			next();
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Getting the wishlist failed",
			errorMessage: error.message,
		});
	}
};

const populateWishlist = async (req, res) => {
	try {
		let wishlist = req.wishlist;
		console.log(wishlist);
		wishlist = await wishlist
			.populate({ path: "products.product" })
			.execPopulate();

		const activeProductsInWishlist = wishlist.products.filter(
			(prod) => prod.isActive
		);
		console.log(activeProductsInWishlist);
		res.status(200).json({ response: { products: activeProductsInWishlist } });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Populating the wishlist failed",
			errorMessage: error.message,
		});
	}
};

const modifyProductInWishlist = async (req, res) => {
	try {
		const updateDetails = req.body;
		let wishlist = req.wishlist;

		console.log({ updateDetails });
		console.log(wishlist);

		const isExistingProduct = wishlist.products.find(
			(prod) => prod.product == updateDetails._id
		);
		console.log({ isExistingProduct });
		if (isExistingProduct) {
			for (let prod of wishlist.products) {
				if (updateDetails._id == prod.product) {
					prod.isActive = !prod.isActive;
				}
			}
		} else {
			wishlist.products.push({ product: updateDetails._id, isActive: true });
		}

		let modifiedWishlist = await wishlist.save();
		modifiedWishlist = await modifiedWishlist
			.populate({
				path: "products.product",
			})
			.execPopulate();
		console.log(modifiedWishlist);
		const activeProductsInWishlist = modifiedWishlist.products.filter(
			(prod) => prod.isActive
		);
		console.log(activeProductsInWishlist);
		res.status(201).json({ response: { products: activeProductsInWishlist } });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Modifying product in the wishlist failed",
			errorMessage: error.message,
		});
	}
};
module.exports = {
	getWishlist,
	populateWishlist,
	modifyProductInWishlist,
};
