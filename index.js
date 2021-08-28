const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const users = require("./routes/users.router");
const products = require("./routes/products.router");
const addresses = require("./routes/addresses.router");
const carts = require("./routes/carts.router");
const wishlists = require("./routes/wishlists.router");
const orders = require("./routes/orders.router");

const userAuthorization = require("./middlewares/userAuthorization");
const dbConnection = require("./db/dbConnect.js");
const route404Handler = require("./middlewares/route404Handler");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

dbConnection();

app.get("/", (req, res) => {
	res.send("Welcome to CamKart Apis");
});
app.get("/hello", (req, res) => {
	res.json({
		message: "Kya bolti public?",
	});
});

// app.use("/users", users);
app.use("/products", products);
app.use("/users", users);

//DO NOT MOVE

//Protected Route(needs to be authenticated before getting accessed)
app.use("/addresses", userAuthorization, addresses);
app.use("/wishlist", userAuthorization, wishlists);
app.use("/cart", userAuthorization, carts);
app.use("/orders", userAuthorization, orders);

//DO NOT MOVE THESE HANDLERS
// 404 Route Handler
app.use(route404Handler);

//Error Handeler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});
