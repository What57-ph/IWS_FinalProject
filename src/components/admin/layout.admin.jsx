import {
  AppstoreOutlined,
  BugOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Drawer, Dropdown, Layout, Menu, message, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { callLogout } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/admin");

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setActiveMenu(path);
  }, [location.pathname])

  // for md screen 

  const [isMobile, setIsMobile] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setOpenDrawer(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize)

  }, [])

  const { logout } = useAuth();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res && +res.statusCode === 200) {
      logout();
      message.success('Đăng xuất thành công');
      window.location.href = callback ? callback : '/';
    }
  }

  const itemsDropdown = [
    { label: <Link to="/">Trang chủ</Link>, key: "home" },
    { label: <span role="button" onClick={handleLogout}>Đăng xuất</span>, key: "logout" },
  ];

  const menuItems = [
    {
      label: <Link to="/admin">Dashboard</Link>,
      key: "/admin",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/admin/user">User</Link>,
      key: "/admin/user",
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/admin/event">Event</Link>,
      key: "/admin/event",
      icon: <CalendarOutlined />,
    },
    {
      label: <Link to="/admin/order">Order</Link>,
      key: "/admin/order",
      icon: <DollarCircleOutlined />,
    },
  ];

  const MenuContent = () => (
    <>
      <div className="h-12 m-4 text-center text-lg flex items-center justify-center">
        {collapsed ? (
          <BugOutlined />
        ) : (
          <>
            <BugOutlined className="mr-2" />
            <span>Admin</span>
          </>
        )}
      </div>

      <Menu
        selectedKeys={[activeMenu]}
        items={menuItems}
        onClick={(e) => {
          setActiveMenu(e.key);
          if (isMobile) {
            setOpenDrawer(false);
          }
        }}
        className="text-start border-none"
        mode={isMobile ? "vertical" : "inline"}
        inlineCollapsed={collapsed && !isMobile}
      />
    </>
  );

  return (
    <Layout className="min-h-screen">
      {
        !isMobile && (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={250}
            collapsedWidth={80}
            className="fixed h-screen z-50"
          >
            <MenuContent />
          </Sider>
        )
      }

      <Drawer
        placement="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        closable={true}
        width={250}
        className="md:hidden"
      >
        <MenuContent />
      </Drawer>

      <Layout
        className={`transition-all duration-200 ${!isMobile ? (collapsed ? "pl-[80px]" : "pl-[250px]") : "pl-0"
          }`}
      >
        <Header className="bg-white shadow-sm flex items-center justify-between px-6">
          <div className="flex flex-row items-center">
            <Button
              type="text"
              icon={
                isMobile ? (
                  <MenuUnfoldOutlined />
                ) : collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={() => {
                if (isMobile) {
                  setOpenDrawer(true);
                } else {
                  setCollapsed(!collapsed);
                }
              }}
              className="!w-16 !h-16 -ml-2"
            />
            <Breadcrumb>
              <Breadcrumb.Item>
                <NavLink to="/admin">Dashboard</NavLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
                {activeMenu.split("/")[2]}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>



          <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
            <Space className="cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg">
              {
                !isMobile &&
                <span className={"text-[20px]"}>
                  Welcome ducsieunhan
                </span>}
              <Avatar className="bg-blue-500">DU</Avatar>
            </Space>
          </Dropdown>
        </Header>

        <Content className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
          <Outlet />
        </Content>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Layout>
  );
};

export default AdminLayout;
