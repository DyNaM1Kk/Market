const express = require("express");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
	return res.json({ status: true });
});

app.listen(8000, () => {
	console.log("Running");
});