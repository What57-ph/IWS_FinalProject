import { AppstoreOutlined, BankOutlined, BugOutlined, CalendarOutlined, DollarCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined }
  from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom"

const AdminLayout = () => {
  const isMobile = false;
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('/admin');

  const itemsDropdown = [
    {
      label: <Link to="/">Trang chủ</Link>,
      key: 'home',
    },
    {
      label: (
        <span
          role="button"
          tabIndex={0}
          className="logout-btn"
        >
          Đăng xuất
        </span>
      ),
      key: 'logout',
    },
  ];

  const viewCompany = true;
  const viewUser = true;
  const viewOrder = false;
  const ACL_ENABLE = 'false';

  const createMenuItem = (path, label, icon, condition) => {
    if (condition || ACL_ENABLE === 'false') {
      return {
        label: <Link to={path}>{label}</Link>,
        key: path,
        icon: icon,
      };
    }
    return null;
  };

  const full = [
    {
      label: <Link to="/admin">Dashboard</Link>,
      key: '/admin',
      icon: <AppstoreOutlined />,
    },
    createMenuItem('/admin/user', 'User', <UserOutlined />, viewCompany),
    createMenuItem('/admin/event', 'Event', <CalendarOutlined />, viewUser),
    createMenuItem('/admin/order', 'Order', <DollarCircleOutlined />, viewOrder),
  ].filter(Boolean);




  return (
    <Layout className="layout-admin min-h-screen">
      {
        !isMobile ? (
          <Sider theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
          >
            <div className="logo h-12 m-4 text-center text-[18px]">
              <BugOutlined /> Admin
            </div>
            <Menu
              selectedKeys={[activeMenu]}
              mode="inline"
              items={full}
              onClick={(e) => setActiveMenu(e.key)}
              className="text-[12px] md:text-[15px]"
            />
          </Sider>)
          : (
            <Menu
              selectedKeys={[activeMenu]}
              mode="inline"
              items={full}
              onClick={(e) => setActiveMenu(e.key)}
            />
          )
      }
      <Layout>
        {!isMobile && (
          <Header className="admin-header bg-slate-100/15" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
          }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />

            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
              <Space style={{ cursor: 'pointer' }}>
                Welcome ducsieunhan
                <Avatar>DU</Avatar>
              </Space>
            </Dropdown>
          </Header>
        )}

        <Content className="p-8">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default AdminLayout