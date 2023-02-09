const _ = require("lodash");
const orderData = require("../dataInit/orderData");

module.exports = (cartItems) => {
  const orderId = `orderNo${orderData.length + 1}`;
  const orderItems = _.map(cartItems, (item) => item.itemId);
  const isDiscounted = false;
  const totalCartPrice = _.sumBy(cartItems, (item) => item.totalPrice);
  const priceAfterDiscount = totalCartPrice;
  const purchaseDate = new Date();
  return {
    orderId,
    orderItems,
    isDiscounted,
    totalCartPrice,
    purchaseDate,
    priceAfterDiscount,
  };
};
