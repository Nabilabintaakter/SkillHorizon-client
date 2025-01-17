import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='font-josefin'>
           <Navbar></Navbar>
           <Footer></Footer>
        </div>
    );
};

export default MainLayout;