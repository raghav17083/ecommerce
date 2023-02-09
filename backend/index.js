const express = require("express");
const cors = require("cors");
const cart = require("./dataInit/cart");
const product = require("./dataInit/product");
const orderData = require("./dataInit/orderData");
const discounts = require("./dataInit/discountCode");
const _ = require("lodash");
const codeGenerator = require("./utility/discountCodeGenerator");
const orderGenerator = require("./utility/orderGenerator");
const userRouter = require("./apiRoutes/userRouter");
const adminRouter = require("./apiRoutes/adminRouter");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  console.log(product);
  return res.send({ data: "called home api on server" });
});

app.get("/products", (req, res) => {
  return res.send({ data: product });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("listening on 8080");
});

//start with fresh files on server restart
fs.truncate("discountData.json", 0, () => {
  console.log("clearing discount data file");
});
fs.truncate("orderData.json", 0, () => {
  console.log("clearing order data file");
});
fs.truncate("cartData.json", 0, () => {
  console.log("clearing cart data file");
});
