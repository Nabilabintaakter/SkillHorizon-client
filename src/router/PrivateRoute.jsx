import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <LoadingSpinner></LoadingSpinner>
    if (user) return children
    return <Navigate to='/login' state={{ from: location }} replace='true' />
};

export default PrivateRoute;