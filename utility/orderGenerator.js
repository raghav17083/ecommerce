const _ = require("lodash");

module.exports = (cartItems) => {
  const itemsInCart = cartItems;
  const totalCartPrice = _.sumBy(cartItems, (item) => item.totalPrice);
  const purchaseDate = new Date();
  return { itemsInCart, totalCartPrice, purchaseDate };
};
