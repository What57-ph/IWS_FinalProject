import { Outlet, NavLink } from "react-router-dom";
import { Breadcrumb } from 'antd';
import { HistoryOutlined, UserOutlined } from "@ant-design/icons";

export default function AccountLayout() {
  return (
    <div className="account-layout relative max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto pt-5 h-full">
        <div id="breadcrumb" className="mb-5">
            <Breadcrumb>
                <Breadcrumb.Item><NavLink to="/">Trang chủ</NavLink></Breadcrumb.Item>
                <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <div className="flex">
            <aside className="sidebar max-md:hidden h-full w-72 p-4 pl-0">
                <div className="flex mb-2">
                    <div className="bg-slate-600 size-9 m-2 ml-0"></div>
                    <div className="flex flex-col">
                        <h3 className="text-sm font-light">Tài khoản của</h3>
                        <h1>Nguyễn Trung Kiên</h1>
                    </div>
                </div>
                <nav>
                <ul>
                    <li className="py-2 w-full">
                        <NavLink to="/account/profile" className="text-red-600"><UserOutlined className="m-2 ml-6"/>Cài đặt tài khoản</NavLink>
                    </li>
                    <li className="py-2 w-full">
                        <NavLink to="/account/history"><HistoryOutlined className="m-2 ml-6"/>Vé đã mua</NavLink>
                    </li>
                </ul>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    </div>
  );
}
