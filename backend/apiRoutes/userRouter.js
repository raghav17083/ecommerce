const _ = require("lodash");
const product = require("../dataInit/product");
const cart = require("../dataInit/cart");
const orderData = require("../dataInit/orderData");
const fs = require("fs");
const discounts = require("../dataInit/discountCode");
const orderGenerator = require("../utility/orderGenerator");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.post("/cart", (req, res, next) => {
  //1. {itemid, quantity, price}
  //2. fetch cart from db
  //3. if cart has itemid increase the quantity of the item
  //4. if item is not there, add item in the cart table and return the cart.
  //5. res.send(cart)
  const body = req.body;
  const { itemId, quantity } = body;
  const productItem = _.find(product, (obj) => obj.itemId == itemId);
  //update in cart
  console.log({ cart });
  if (!_.isEmpty(_.find(cart, (obj) => obj.itemId == itemId))) {
    let item = _.find(cart, (obj) => {
      return obj.itemId == itemId;
    });
    if (_.isNull(_.get(item, "quantity"))) {
      item.quantity = parseInt(quantity);
    } else {
      item.quantity = parseInt(item.quantity) + parseInt(quantity);
    }
    item.totalPrice = item.quantity * productItem.price;
    fs.writeFileSync("cartData.json", JSON.stringify(cart, null, 2));
    res.send({ data: { method: "update", cart } });
    return;
  }
  //add into the cart
  cart.push({
    itemId,
    quantity,
    totalPrice: quantity * productItem.price,
  });
  fs.writeFileSync("cartData.json", JSON.stringify(cart, null, 2));
  res.send({ data: { method: "add", cart } });
  return;
});

router.post("/checkout", (req, res) => {
  /**
   * 1. table structure for Orders -> OrderId, itemsInCart, totalPrice, orderNumber, dateOfPurchase
   * assuming we give discount on every 5th order, so, if the orderId with latestDate has sequenceOrder 4 we
   * give a discount.
   * {orderId, purchaseDate, }
   */
  const { discountCode } = req.body;
  console.log({ discountCode });
  let discountApplied = false;
  const curDiscount =
    discountCode === ""
      ? null
      : _.find(discounts, (discount) => discount.code == discountCode);
  console.log({ curDiscount });
  const curOrder = orderGenerator(cart);
  if (
    !_.isNull(curDiscount) &&
    (_.isEmpty(curDiscount) || !curDiscount.isValid)
  ) {
    res.status(406).send("incorrect or invalid code applied");
    return;
  }
  if (!_.isNull(curDiscount) && curDiscount.isValid) {
    curOrder.isDiscounted = true;
    curOrder.discountCode = curDiscount.code;
    discountApplied = true;
    curDiscount.isValid = false;
    fs.writeFileSync("discountData.json", JSON.stringify(discounts, null, 2));
    curOrder.priceAfterDiscount = 0.9 * curOrder.totalCartPrice;
  }
  orderData.push(curOrder);
  _.remove(cart, () => true); //empty the cart for the user once order is placed, so that new cart can be used
  console.log(cart);
  fs.writeFileSync("orderData.json", JSON.stringify(orderData, null, 2));
  //clear the cart

  res.send({ data: { discountApplied, orderData } });
});
module.exports = router;
