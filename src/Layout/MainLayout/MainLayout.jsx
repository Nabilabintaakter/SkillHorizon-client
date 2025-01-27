import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';


const MainLayout = () => {
    return (
        <div className='font-josefin'>
            <ScrollToTop></ScrollToTop>
            <div className='h-[64px]'><Navbar></Navbar></div>
            <div className='min-h-[calc(100vh-839px)] md:min-h-[calc(100vh-389px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;