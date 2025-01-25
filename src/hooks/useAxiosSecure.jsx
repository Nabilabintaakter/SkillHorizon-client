import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signingOut, setLoading } = useAuth();

    useEffect(() => {
        const setupInterceptors = async () => {
            const requestInterceptor = axiosSecure.interceptors.request.use(
                (config) => {
                    const token = localStorage.getItem('access-token');
                    if (token) {
                        config.headers.authorization = `Bearer ${token}`;
                    }
                    return config;
                },
                (error) => Promise.reject(error)
            );
    
            const responseInterceptor = axiosSecure.interceptors.response.use(
                (response) => response,
                async (error) => {
                    const status = error.response?.status;
                    if (status === 401 || status === 403) {
                        await signingOut();
                        setLoading(false);
                        navigate('/login');
                        console.log('hayhay');
                    }
                    return Promise.reject(error);
                }
            );
    
            return () => {
                axiosSecure.interceptors.request.eject(requestInterceptor);
                axiosSecure.interceptors.response.eject(responseInterceptor);
            };
        };
    
        setupInterceptors();
    }, [navigate, signingOut, setLoading]);
    

    return axiosSecure;
};

export default useAxiosSecure;
