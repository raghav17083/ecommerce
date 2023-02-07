const _ = require("lodash");
const orderData = require("../dataInit/orderData");

module.exports = (cartItems) => {
  const orderId = `orderNo${orderData.length + 1}`;
  const itemsInCart = cartItems;
  const isDiscounted = false;
  const totalCartPrice = _.sumBy(cartItems, (item) => item.totalPrice);
  const priceAfterDiscount = totalCartPrice;
  const purchaseDate = new Date();
  return {
    orderId,
    itemsInCart,
    isDiscounted,
    totalCartPrice,
    purchaseDate,
    priceAfterDiscount,
  };
};
