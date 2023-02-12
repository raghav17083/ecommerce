import { List } from "antd";
import axios from "axios";
import { Button } from "antd";
import { InputNumber } from "antd";
import { useState } from "react";

const Item = ({ item }) => {
  const { itemId, price } = item;
  const [quantity, setQuantity] = useState(1);
  const addToCart = (itemId, quantity) => {
    axios
      .post("http://127.0.0.1:8080/user/cart", {
        itemId,
        quantity,
      })
      .then((response) => {
        console.log(response);
      });
  };
  const onChange = (value) => {
    setQuantity(value);
  };
  return (
    <div>
      <List.Item.Meta title={`item name: ${item.name}`} />
      price: {item.price}
      <div>
        <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
      </div>
      <div>
        <Button onClick={() => addToCart(itemId, quantity)} type="primary">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
export default Item;
