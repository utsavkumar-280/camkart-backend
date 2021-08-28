const express = require("express");
const router = express.Router();

const { createOrder, getOrders } = require("../controllers/orders.controller");

router.route("/").get(getOrders).post(createOrder);

module.exports = router;
