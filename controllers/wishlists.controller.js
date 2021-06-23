const { Wishlist } = require("../models/wishlist.model");

const getWishlist = async (req, res, next) => {
	try {
		const userId = req.user._id;
		const wishlist = await Wishlist.findOne({ userId });

		if (!wishlist) {
			const newWishlist = new Wishlist({ userId, products: [] });
			const savedNewWishlist = await newWishlist.save();
			res.wishlist = savedNewWishlist;
		}
		req.wishlist = wishlist;
		next();
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
		wishlist = await wishlist
			.populate({ path: "products.product" })
			.execPopulate();

		const activeProductsInWishlist = wishlist.products.filter(
			(prod) => prod.isActive
		);

		res.status(200).json({ response: activeProductsInWishlist });
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
		const isExistingProduct = wishlist.products.find(
			(prod) => prod.product === updateDetails.product
		);

		if (isExistingProduct) {
			wishlist = wishlist.products.map((prod) => {
				if (prod.product === updateDetails._id) {
					prod.isActive = !prod.isActive;
				}
			});
		} else {
			wishlist.products.push({ product: updateDetails._id, isActive: true });
		}

		let modifiedWishlist = await wishlist.save();
		modifiedWishlist = await modifiedWishlist
			.populate({
				path: "products.product",
			})
			.execPopulate();

		const activeProductsInWishlist = modifiedWishlist.products.filter(
			(prod) => prod.isActive
		);

		res.status(201).json({ response: activeProductsInWishlist });
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
