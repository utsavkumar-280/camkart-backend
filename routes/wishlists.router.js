const express = require("express");
const router = express.Router();

const {
	getWishlist,
	populateWishlist,
	modifyProductInWishlist,
} = require("../controllers/wishlists.controller");

router.use(getWishlist);

router.route("/").get(populateWishlist).post(modifyProductInWishlist);

module.exports = router;
