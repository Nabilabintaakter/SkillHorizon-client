import React from 'react';
import cover from '../../../assets/cover.png';
import userImg from '../../../assets/user.png';
import useAuth from '../../../hooks/useAuth';
import { MdEmail, MdPhone } from 'react-icons/md';
import { MdWork } from "react-icons/md";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <p className='text-[#0886A0] mb-3 font-medium'>Your Personalized Profile Overview</p>
                    <h1 className='text-black text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto'>Welcome to Your Dashboard</h1>
                </div>

                <div className="bg-white rounded-xl shadow-lg mx-auto max-w-lg overflow-hidden relative">
                    <div className="relative">
                        <img
                            src={cover}
                            alt="Cover"
                            className="w-full h-44 object-cover"
                        />
                        <div className="absolute left-6 -bottom-9 z-10">
                            <div className="w-36 h-36 rounded-full overflow-hidden p-1 bg-white">
                                <img
                                    src={user?.photoURL || userImg}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-5 mt-4">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold mt-4 text-gray-800">
                                {user?.displayName || 'Anonymous'}
                            </h1>
                            <div className="flex items-center">
                                <MdEmail className="text-gray-500 mr-2" />
                                <p className=" text-gray-500">
                                    {user?.email || 'No Email Available'}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <MdPhone className="text-gray-500 mr-2" />
                                <p className=" text-gray-500">
                                    {user?.phone || 'No Phone Available'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 absolute bottom-[112px] right-2">
                            <button className="flex items-center px-4 py-1 bg-gradient-to-r from-[#95D3A2] to-[#36A0AD] text-white rounded-full text-sm font-medium shadow-lg">
                                <MdWork className="text-white mr-2" />
                                <span> 
                                    Role: Student
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;