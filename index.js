const express = require("express");
const cors = require("cors");
const cart = require("./dataInit/cart");
const product = require("./dataInit/product");
const orderData = require("./dataInit/orderData");
const discounts = require("./dataInit/discountCode");
const _ = require("lodash");
const codeGenerator = require("./utility/discountCodeGenerator");
const orderGenerator = require("./utility/orderGenerator");
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

app.post("/cart", (req, res, next) => {
  console.log({ req });
  const body = req.body;
  const { itemId, quantity } = body;
  const productItem = _.find(product, (obj) => obj.itemId == itemId);
  //update in cart
  if (!_.isEmpty(_.find(cart.cartItems, (obj) => obj.itemId == itemId))) {
    let item = _.find(cart.cartItems, (obj) => obj.itemId == itemId);
    if (_.isNull(_.get(item, "quantity"))) {
      item.quantity = parseInt(quantity);
    } else {
      item.quantity = parseInt(item.quantity) + parseInt(quantity);
    }
    item.totalPrice = item.quantity * productItem.price;
    console.log({ cart });
    fs.writeFileSync("cartData.json", JSON.stringify(cart, null, 2));
    res.send({ method: "update", cart });
    return;
  }
  console.log({ itemId, quantity });
  //add
  cart.cartItems.push({
    itemId,
    quantity,
    totalPrice: quantity * productItem.price,
  });
  fs.writeFileSync("cartData.json", JSON.stringify(cart, null, 2));
  res.send({ method: "add", cart });
  return;
  //1. {itemid, quantity, price}
  //2. fetch cart from db
  //3. if cart has itemid increase the quantity of the item
  //4. if item is not there, add item in the cart table and return the cart.
  //5. res.send(cart)
});

app.post("/checkout", (res, req) => {
  /**
   * 1. table structure for Orders -> OrderId, itemsInCart, totalPrice, orderNumber, dateOfPurchase
   * assuming we give discount on every 5th order, so, if the orderId with latestDate has sequenceOrder 4 we
   * give a discount.
   * {orderId, purchaseDate, }
   */
  const { discountCode } = req.body;
  const curDiscount = _.find(
    discounts,
    (discount) => discount.code == discountCode
  );
  if (!curDiscount.isValid) {
    res.status(406).send("invalid discount code");
    return;
  }
  const curOrder = orderGenerator(cart.cartItems);
});

app.post("/admin/generate-discount", (req, res) => {
  const { orderNumber } = req.body;
  if (orderNumber % 5 == 0) {
    //every 5th order
    const discountCode = codeGenerator(6);
    const discountResult = { isValid: true, code: discountCode };
    discounts.push(discountResult);
    fs.writeFileSync("discountData.json", JSON.stringify(discounts, null, 2));
    res.send(discountResult);
  } else {
    res.status(406).send("cannot generate discount");
  }
});
