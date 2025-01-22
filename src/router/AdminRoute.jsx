import { Navigate } from "react-router-dom"
import useRole from "../hooks/useRole"
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner"

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole()
  
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    if (role === 'admin') return children
    return <Navigate to='/dashboard' replace='true' />
  }
  
  
  export default AdminRoute;