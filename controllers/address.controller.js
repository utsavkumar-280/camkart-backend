const { Address } = require("../models/address.model");
const { extend } = require("lodash");

const createAddress = async (req, res) => {
	try {
		const userId = req.user._id;
		const addressDetails = req.body;
		const NewAddress = new Address({ userId, ...addressDetails });
		await NewAddress.save();
		const updatedAddresses = await Address.find({ userId: userId });

		res.status(201).json({ response: updatedAddresses });
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
		const addresses = await Address.find({ userId: userId });
		console.log({ addresses });

		res.status(200).json({ response: addresses });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Getting all the addresses failed",
			errorMessage: error.message,
		});
	}
};

const getAddress = async (req, res, next, id) => {
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
		const userId = req.user._id;
		const address = req.address;
		const addressDetails = req.body;
		const updatedAddress = extend(address, addressDetails);
		await updatedAddress.save();
		const updatedAddresses = await Address.find({ userId: userId });

		res.status(200).json({
			message: "Address updated",
			response: updatedAddresses,
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
		const userId = req.user._id;
		const address = req.address;
		await address.remove();
		const updatedAddresses = await Address.find({ userId: userId });

		res.status(200).json({
			message: "Address deleted",
			response: updatedAddresses,
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
