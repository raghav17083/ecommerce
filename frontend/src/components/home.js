import { Router, route, Link } from "react-router-dom";
import { Button, Space } from "antd";

const Home = () => {
  return (
    <div className="App">
      <Space wrap>
        <Link to="/user">
          <Button type="primary">User</Button>
        </Link>
        <Link to="/admin">
          <Button type="primary">Admin</Button>
        </Link>
      </Space>
    </div>
  );
};

export default Home;
