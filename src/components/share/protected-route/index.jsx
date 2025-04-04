import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  return (
    <>
      {loading === true ?
        <div>Loading...</div>
        :
        <>
          {
            user !== null ?
              <>
                {children}
              </>
              :
              <Navigate to='/auth/login' replace />
          }
        </>
      }
    </>
  )
}
export default ProtectedRoute