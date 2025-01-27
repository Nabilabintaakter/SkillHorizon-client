import { Navigate } from "react-router-dom"
import useRole from "../hooks/useRole"
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner"
import useAuth from "../hooks/useAuth"

const TeacherRoute = ({ children }) => {
    const [role, isLoading] = useRole()
    const {signingOut} = useAuth();
  
    if (isLoading) return <LoadingSpinner />
    if (role === 'Teacher' || role=== "Admin") return children
    else{
      signingOut()
      return <Navigate to='/login' replace='true' />
    } 
  }
  
  
  export default TeacherRoute;