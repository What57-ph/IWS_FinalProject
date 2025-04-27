import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"

const ProtectedRoute = ({ children, requireAdmin, requireAuth }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Loading..</div>
  }

  if ((requireAuth || requireAdmin) && !isAuthenticated) {
    const currentPath = window.location.pathname;
    return <Navigate to={`/auth/login?redirect=${currentPath}`} replace />;
  }

  if (requireAdmin && user.role !== "ADMIN") {
    return <Navigate to="/*" replace />;
  }

  return children;
}
export default ProtectedRoute