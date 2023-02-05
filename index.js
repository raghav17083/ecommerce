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
app.get("/", (req, res) => {
  console.log(product);
  res.send({ body: "Lets get this unibox assignment" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("listening on 8080");
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);
