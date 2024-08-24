import React, { useEffect, useState } from "react";
import './style.css';
import {
  DiffOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import http from "../config";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  async function checkToken() {
    const response = await http.get('/admin/profile');
    if (response?.status !== 200) {
      navigate('/');
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#13274F' }}>
        <div className="logo">
         <div> <h1 style={{ color: '#fff'}}>Admin Panel</h1></div>
        </div>
        
        <div style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div onClick={() => navigate('/dashboard')} style={{ display: 'flex', alignItems: 'center', color: '#fff', gap: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            <ProductOutlined style={{ fontSize: 20, color: '#fff' }} />
            <p className={`${collapsed && 'menu-btn'}`}>Products</p>
          </div>
          <div onClick={() => navigate('categories')} style={{ display: 'flex', alignItems: 'center', color: '#fff', gap: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            <DiffOutlined style={{ fontSize: 20, color: '#fff' }} />
            <p className={`${collapsed && 'menu-btn'}`}>Categories</p>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#13274F', borderBottom: '1px solid #E0E0E0' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: '#fff',
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: '#F5F5F5',
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
