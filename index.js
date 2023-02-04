const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send({ body: "Lets get this unibox assignment" });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("listening on 8080");
});
