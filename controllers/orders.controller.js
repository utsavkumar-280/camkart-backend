const { join } = require("lodash");
const { Cart } = require("../models/cart.model");
const { Order } = require("../models/order.model");

const createOrder = async (req, res) => {
	try {
		const userId = req.user._id;
		const orderDetails = req.body;
		const NewOrder = new Order({ userId, ...orderDetails });
		const savedNewOrder = await NewOrder.save();

		const cart = await Cart.findOne({ userId });

		cart.products = cart.products.filter(
			(prod) =>
				!orderDetails.products.find((cartProd) => {
					return cartProd.prod.toString() === prod.productd.toString();
				})
		);
		await cart.save();
		res.status(201).json({ response: savedNewOrder._id });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Creating the order failed",
			errorMessage: error.message,
		});
	}
};

const getOrders = async (req, res) => {
	try {
		const userId = req.user._id;
		const orders = await Order.find({ userId })
			.populate({ path: "products.product" })
			.populate({ path: "address" })
			.sort({ createdAt: -1 });

		res.status(200).json({ response: orders });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Getting the order failed",
			errorMessage: error.message,
		});
	}
};
module.exports = { createOrder, getOrders };
