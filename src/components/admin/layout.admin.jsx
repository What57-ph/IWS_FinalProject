import { AppstoreOutlined, BugOutlined, CalendarOutlined, DollarCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('/admin');

  const itemsDropdown = [
    { label: <Link to="/">Trang chủ</Link>, key: 'home' },
    { label: <span role="button">Đăng xuất</span>, key: 'logout' }
  ];

  const menuItems = [
    { label: <Link to="/admin">Dashboard</Link>, key: '/admin', icon: <AppstoreOutlined /> },
    { label: <Link to="/admin/user">User</Link>, key: '/admin/user', icon: <UserOutlined /> },
    { label: <Link to="/admin/event">Event</Link>, key: '/admin/event', icon: <CalendarOutlined /> },
    { label: <Link to="/admin/order">Order</Link>, key: '/admin/order', icon: <DollarCircleOutlined /> },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        collapsedWidth={80}
        className="fixed h-screen z-50"
      >
        <div className="h-12 m-4 text-center text-lg flex items-center justify-center">
          {collapsed ? <BugOutlined /> : (
            <>
              <BugOutlined className="mr-2" />
              <span>Admin</span>
            </>
          )}
        </div>

        <Menu
          selectedKeys={[activeMenu]}
          mode="inline"
          items={menuItems}
          onClick={(e) => setActiveMenu(e.key)}
          className="text-base"
          inlineCollapsed={collapsed}
        />
      </Sider>

      <Layout className={`transition-all duration-200 ${collapsed ? 'pl-[80px]' : 'pl-[250px]'}`}>
        <Header className="bg-white shadow-sm flex items-center justify-between px-6">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="!w-16 !h-16 -ml-2"
          />

          <Dropdown menu={{ items: itemsDropdown }} trigger={['click']} >
            <Space className="cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg">
              <span className={collapsed ? 'hidden' : 'text-[20px]'}>Welcome ducsieunhan</span>
              <Avatar className="bg-blue-500">DU</Avatar>
            </Space>
          </Dropdown>
        </Header>

        <Content className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;