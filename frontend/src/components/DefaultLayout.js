import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../styles/defaultLayout.css";
import { Layout, Menu, Button, theme } from "antd";
import Spin from "./Spin";

const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // to get localstorage data
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout>
      {loading && <Spin />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h1 className="text-center text-light font-wight-bold mt-4">IMS</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            className="cart-item d-flex justify-content-spce-between flex-row"
            onClick={() => navigate("/cart")}>
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="custom-body-class"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
