const _ = require("lodash");
const orderData = require("../dataInit/orderData");

module.exports = (cartItems) => {
  const orderId = `orderNo ${orderData.length}`;
  const itemsInCart = cartItems;
  const isDiscounted = false;
  const totalCartPrice = _.sumBy(cartItems, (item) => item.totalPrice);
  const priceAfterDiscount = totalCartPrice;
  const purchaseDate = new Date();
  return {
    itemsInCart,
    isDiscounted,
    totalCartPrice,
    purchaseDate,
    priceAfterDiscount,
  };
};
