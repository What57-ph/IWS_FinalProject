import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div>
      <div>
        This is sidebar
      </div>
      <Outlet />
    </div>
  )
}
export default AdminLayout