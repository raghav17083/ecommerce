import logo from "./logo.svg";
import "./App.css";
import { Button, Space } from "antd";
import "antd/dist/reset.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p></p>
        <Space wrap>
          <div>
            <Button type="primary">USER</Button>
          </div>
          <div>
            <Button type="primary">ADMIN</Button>
          </div>
        </Space>
      </header>
    </div>
  );
}

export default App;
