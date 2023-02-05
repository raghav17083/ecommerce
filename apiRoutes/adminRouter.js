const express = require("express");
const codeGenerator = require("../utility/discountCodeGenerator");
const discounts = require("../dataInit/discountCode");
const fs = require("fs");
const router = express.Router();

router.post("/generate-discount", (req, res) => {
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

module.exports = router;
