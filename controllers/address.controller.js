const { Address } = require("../models/address.model");
const { extend } = require("lodash");

const createAddress = async (req, res) => {
	try {
		const userId = req.user._id;
		const addressDetails = req.body;
		const NewAddress = new Address({ userId, ...addressDetails });
		const savedNewAddress = await NewAddress.save();

		res.status(201).json({ response: savedNewAddress });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Creating the address failed",
			errorMessage: error.message,
		});
	}
};

const getAllAddresses = async (req, res) => {
	try {
		const userId = req.user._id;
		const addresses = await Address.find({ userId });

		res.status(200).json({ response: addresses });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Getting all the addresses failed",
			errorMessage: error.message,
		});
	}
};

const getAddress = async (req, res) => {
	try {
		const userId = req.user._id;
		const address = await Address.findOne({ _id: id, userId });

		if (address) {
			req.address = address;
			next();
		} else {
			res
				.status(404)
				.json({ message: "Given address doesn't exists for the user" });
			return;
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Getting the address failed",
			errorMessage: error.message,
		});
	}
};

const updateAddress = async (req, res) => {
	try {
		const address = req.address;
		const addressDetails = req.body;
		const updatedAddress = extend(address, addressDetails);
		const savedUpdatedAddress = await updatedAddress.save();

		res.status(200).json({
			message: "Address updated",
			response: savedUpdatedAddress,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Updating the address failed",
			errorMessage: error.message,
		});
	}
};

const deleteAddress = async (req, res) => {
	try {
		const address = req.address;
		const deletedAddress = await address.remove();

		res.status(200).json({
			message: "Address deleted",
			response: deletedAddress,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Deleting the address failed",
			errorMessage: error.message,
		});
	}
};

module.exports = {
	createAddress,
	getAllAddresses,
	getAddress,
	updateAddress,
	deleteAddress,
};
