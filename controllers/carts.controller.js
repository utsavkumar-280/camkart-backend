const { Cart } = require("../models/cart.model");
const { extend } = require("lodash");

const getCart = async (req, res, next) => {
	try {
		const userId = req.user._id;
		const cart = await Cart.findOne({ userId });

		if (!cart) {
			const newCart = new Cart({ userId, products: [] });
			const savedCart = await newCart.save();
			req.cart = savedCart;
			next();
		} else {
			req.cart = cart;
			next();
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Getting cart failed",
			errorMessage: error.message,
		});
	}
};

const populateCart = async (req, res) => {
	try {
		let cart = req.cart;
		cart = await cart.populate({ path: "products.product" }).execPopulate();

		const activeProductsInCart = cart.products.filter((prod) => prod.isActive);

		res.status(200).json({
			response: activeProductsInCart,
			address: cart.address,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Populating the cart failed",
			errorMessage: error.message,
		});
	}
};

const modifyProductInCart = async (req, res) => {
	try {
		const updateDetails = req.body;
		const cart = req.cart;

		const isExistingProduct = cart.products.find(
			(prod) => prod.product === updateDetails._id
		);

		if (isExistingProduct) {
			cart.products = cart.products.map((prod) =>
				prod.product === updateDetails._id ? extend(prod, updateDetails) : prod
			);
		} else {
			cart.products.push({
				product: updateDetails._id,
				quantity: 1,
				isActive: true,
			});
		}

		const modifiedCart = await cart.save();
		const savedModifiedCart = await modifiedCart
			.populate({ path: "products.product" })
			.execPopulate();

		const activeProductsInCart = savedModifiedCart.products.filter(
			(prod) => prod.isActive
		);

		res.status(200).json({
			response: {
				products: activeProductsInCart,
				address: cart.address,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Modifying the product in the cart failed",
			errorMessage: error.message,
		});
	}
};

const updateAddress = async (req, res) => {
	try {
		const addressUpdateDetails = req.body;
		let cart = req.cart;
		cart.address = addressUpdateDetails._id;

		cart = await cart.save();
		cart = await cart
			.populate({
				path: "products.product",
			})
			.execPopulate();

		const activeProductsInCart = cart.products.filter((prod) => prod.isActive);

		res.status(200).json({
			response: {
				products: activeProductsInCart,
				address: cart.address,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Updating the address in the cart failed",
			errorMessage: error.message,
		});
	}
};

module.exports = {
	getCart,
	populateCart,
	modifyProductInCart,
	updateAddress,
};
