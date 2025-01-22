import { Navigate } from "react-router-dom"
import useRole from "../hooks/useRole"
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner"

const TeacherRoute = ({ children }) => {
    const [role, isLoading] = useRole()
  
    if (isLoading) return <LoadingSpinner />
    if (role === 'seller') return children
    return <Navigate to='/dashboard' replace='true' />
  }
  
  
  export default TeacherRoute;