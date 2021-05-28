const express = require("express");
const router = express.Router();

const {
	getAllProducts,
	addNewProduct,
	getProductById,
} = require("../controllers/products.controller");

router.route("/").get(getAllProducts).post(addNewProduct);

router.route("/:id").get(getProductById);

module.exports = router;
