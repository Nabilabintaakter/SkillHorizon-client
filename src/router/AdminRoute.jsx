import { Navigate } from "react-router-dom"
import useRole from "../hooks/useRole"
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner"

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole()
  
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    if (role === 'Admin') return children
    else if (role === 'Teacher') return <Navigate to='/dashboard/my-class' replace='true' />
    return <Navigate to='/dashboard/my-enroll-class' replace='true' />
  }
  
  
  export default AdminRoute;