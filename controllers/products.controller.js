const { Product } = require("../models/product.model");

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});

		res.status(200).json({ response: products });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				"Server Error, request failed. See error message for more details.",
			errorMessage: error.message,
		});
	}
};

const addNewProduct = async (req, res) => {
	try {
		const productDetails = req.body;
		const NewProduct = new Product(productDetails);
		const savedProduct = await NewProduct.save();

		res.status(201).json({ response: savedProduct });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				"Server Error, request failed. See error message for more details.",
			errorMessage: error.message,
		});
	}
};

const getProductById = async (req, res) => {
	try {
		const productId = req.params;

		const product = await Product.findById({ _id: productId.id });

		product
			? res.status(200).json({ response: product })
			: res.status(404).json({ message: "Product Not Found" });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				"Server Error, request failed. See error message for more details.",
			errorMessage: error.message,
		});
	}
};

module.exports = { getAllProducts, addNewProduct, getProductById };
