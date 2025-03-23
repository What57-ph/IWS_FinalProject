import { Outlet } from "react-router-dom"

const ClientLayout = () => {
  return (
    <div>
      <div>
        This is sidebar of client
      </div>
      <Outlet />
    </div>
  )
}
export default ClientLayout