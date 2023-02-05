const _ = require("lodash");
const product = require("../dataInit/product");
const cart = require("../dataInit/cart");
const fs = require("fs");
const discounts = require("../dataInit/discountCode");
const orderGenerator = require("../utility/orderGenerator");
const express = require("express");
const router = express.Router();

router.post("/cart", (req, res, next) => {
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
  //add into the cart
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

router.post("/checkout", (res, req) => {
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
module.exports = router;
