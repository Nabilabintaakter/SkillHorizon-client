import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className='font-josefin'>
            <div className='h-[64px]'><Navbar></Navbar></div>
            <div className='min-h-[calc(100vh-839px)] md:min-h-[calc(100vh-389px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    removeDelay: 1000,


                    // Default options for specific types
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                        },
                    },
                }}
            />
        </div>
    );
};

export default MainLayout;