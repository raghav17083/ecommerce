import axios from "axios";
import { useFetch } from "react-async";
import { useEffect, useState } from "react";
import { Button } from "antd";
const User = () => {
  // 1. Fetch all the products
  const [product, setProducts] = useState([]);
  const listProduct = () => {
    axios.get("http://127.0.0.1:8080/products").then((response) => {
      const { data: products } = response.data;
      console.log(products);
      setProducts(products);
    });
  };
  useEffect(() => {
    listProduct();
  }, []);
  console.log({ product });
  return (
    <div>
      <Button>List Products</Button>
    </div>
  );
};
export default User;
