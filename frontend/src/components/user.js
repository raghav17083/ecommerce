import axios from "axios";
import { useFetch } from "react-async";
import { useEffect, useState } from "react";
import { Button, List } from "antd";
import Item from "./item";
import _ from "lodash";
const User = () => {
  // 1. Fetch all the products
  const [list, showList] = useState(false);
  const [product, setProducts] = useState([]);
  const fetchProducts = () => {
    axios.get("http://127.0.0.1:8080/products").then((response) => {
      const { data: products } = response.data;
      console.log(products);
      setProducts(products);
    });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const listProducts = () => {
    showList(!list);
  };
  const addToCart = ({ itemId, quantity }) => {};
  const displayProduct = list && "Display products";
  return (
    <div>
      <Button onClick={listProducts}>List Products</Button>
      <div>
        {list && (
          <div>
            <List
              dataSource={product}
              renderItem={(item) => (
                <List.Item key={item.itemId}>
                  <Item item={item} />
                  {/*<Button onClick={}></Button>*/}
                </List.Item>
              )}
            ></List>
          </div>
        )}
      </div>
    </div>
  );
};
export default User;
