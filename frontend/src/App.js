import logo from "./logo.svg";
import "./App.css";
import { Button, Space } from "antd";
import "antd/dist/reset.css";
import User from "./components/user";
import Admin from "./components/admin";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/user" element={<User />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  );
}

export default App;
