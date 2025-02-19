import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { IoMdSettings } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { AiOutlineBars } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/l-1.png';
import text from '../../assets/l-2.png';
import StudentMenu from './Menu/StudentMenu';
import TeacherMenu from './Menu/TeacherMenu';
import AdminMenu from './Menu/AdminMenu';
import useAuth from '../../hooks/useAuth';
import MenuItem from './Menu/MenuItem';
import useRole from '../../hooks/useRole';

const Sidebar = () => {
    const { signingOut } = useAuth();
    const [isActive, setActive] = useState(false);
    const [role, isLoading] = useRole();
    const navigate = useNavigate();

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive);
    };
    const handleSignOutFromDashboard = () => {
        signingOut()
            .then(() => { 
                navigate('/')
            })
            .catch(err => {
                // console.log(err)
            })
    }

    return (
        <>
            {/* Small Screen Navbar */}
            <div className='h-[64px]'>
                <div className="bg-gradient-to-r from-[#95D3A2] to-[#36A0AD] text-white flex justify-between md:hidden fixed top-0 bg-white/70 backdrop-blur-md z-50 w-full h-[64px]">
                    <div>
                        <div className="block cursor-pointer p-4 font-bold">
                            <Link to={'/'} className="flex">
                                <img className="h-10" src={logo} alt="" />
                                <img
                                    className="w-20 h-10"
                                    src={text}
                                    alt=""
                                />
                            </Link>
                        </div>
                    </div>

                    <button
                        onClick={handleToggle}
                        className="mobile-menu-button p-5 focus:outline-none hover:bg-white hover:text-[#36A0AD] rounded-full"
                    >
                        <AiOutlineBars className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#D7F5EB] text-[#009478] w-60 md:w-64 space-y-6 absolute inset-y-0 left-0 transform ${isActive ? '-translate-x-full' : ''
                    } md:translate-x-0 transition duration-300 ease-in-out shadow-lg`}
            >
                <div className=''>
                    <div
                        className="w-full hidden md:flex px-4 py-2 justify-center items-center bg-white mx-auto"
                        style={{
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3), 0px 4px 4px rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <Link to={'/'} className="flex">
                            <img className="h-10 md:h-14" src={logo} alt="" />
                            <img
                                className="w-20 md:w-28 h-10 md:h-14 ml-2"
                                src={text}
                                alt=""
                            />
                        </Link>
                    </div>
                    {/* Nav Items */}
                    <div className="flex flex-col justify-between flex-1 mt-20 md:mt-5">
                        <nav>
                            {/* Menu Items */}
                            {role === 'Student' && <StudentMenu />}
                            {role === 'Teacher' && <TeacherMenu />}
                            {role === 'Admin' && <AdminMenu />}
                        </nav>
                    </div>
                </div>

                <div>
                    <hr className="border-gray-300 my-4" />

                    <MenuItem
                        icon={IoMdSettings}
                        label="Profile"
                        address="/dashboard/profile"
                    />
                    <MenuItem
                        icon={GrOverview}
                        label="Overview"
                        address="/dashboard/overview"
                    />
                    <button
                        onClick={handleSignOutFromDashboard}
                        className="flex w-full items-center px-4 py-2 my-5  text-red-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-300 transform rounded-lg"
                    >
                        <GrLogout className="w-5 h-5" />
                        <span className="mx-4 font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
