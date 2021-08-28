const express = require("express");
const router = express.Router();
const userAuthorization = require("../middlewares/userAuthorization");

const {
	createUser,
	userAuthenticator,
	updatePassword,
} = require("../controllers/users.controller");

router.route("/").post(createUser);
router.route("/login").post(userAuthenticator);
router.route("/password-reset").post(updatePassword);

module.exports = router;
