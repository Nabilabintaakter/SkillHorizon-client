import { Navigate } from "react-router-dom"
import useRole from "../hooks/useRole"
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner"

const TeacherRoute = ({ children }) => {
    const [role, isLoading] = useRole()
  
    if (isLoading) return <LoadingSpinner />
    if (role === 'Teacher') return children
    else if (role === 'Student') return <Navigate to='/dashboard/my-enroll-class' replace='true' />
    return <Navigate to='/dashboard/teacher-request' replace='true' />
  }
  
  
  export default TeacherRoute;