const express = require("express");
const router = express.Router();

const {
	getCart,
	populateCart,
	modifyProductInCart,
	updateAddress,
} = require("../controllers/carts.controller");

router.use(getCart);

router.route("/").get(populateCart).post(modifyProductInCart);

router.route("/address").post(updateAddress);
