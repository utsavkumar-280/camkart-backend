const express = require("express");
const router = express.Router();

const {
	createAddress,
	getAllAddresses,
	getAddress,
	updateAddress,
	deleteAddress,
} = require("../controllers/address.controller");

router.route("/").get(getAllAddresses).post(createAddress);

router.param("addressId", getAddress);

router.route("/:addressId").post(updateAddress).delete(deleteAddress);

module.exports = router;
