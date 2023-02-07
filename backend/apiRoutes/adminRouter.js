const express = require("express");
const codeGenerator = require("../utility/discountCodeGenerator");
const discounts = require("../dataInit/discountCode");
const fs = require("fs");
const router = express.Router();
const orderData = require("../dataInit/orderData");

router.post("/generate-discount", (req, res) => {
  const { orderNumber } = req.body;
  if (orderNumber % 5 == 0) {
    // Todo: assumption taken -> every 5th order to be discounted
    const discountCode = codeGenerator(6);
    const discountResult = { isValid: true, code: discountCode };
    discounts.push(discountResult);
    fs.writeFileSync("discountData.json", JSON.stringify(discounts, null, 2));
    res.send(discountResult);
  } else {
    res.status(406).send("cannot generate discount");
  }
});

router.get("/statistics", (req, res) => {
  //generate order statistics

  res.send({ orderData });
  //check last order since, we can only get the information for the last purchased items
});

module.exports = router;
