import React, { useEffect } from 'react';
import cover from '../../../assets/cover.png';
import userImg from '../../../assets/user.png';
import useAuth from '../../../hooks/useAuth';
import { MdEmail, MdPhone } from 'react-icons/md';
import { MdWork } from "react-icons/md";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { Fade, Zoom } from 'react-awesome-reveal';
import ProfileCard from './ProfileCard';

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: userData = [], isLoading } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/${user?.email}`)
            return data
        },
    })
    useEffect(() => {
        document.title = ` Your Profile | SkillHorizon`;
    }, [])
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="bg-[#E6EBEE] min-h-screen py-8">
            <div className="container mx-auto px-4">
                <Zoom triggerOnce>
                    <div className="text-center mb-8">
                        <h1 className='text-black text-2xl mb-3 md:text-3xl lg:text-4xl font-bold w-full mx-auto'>Welcome to Your Dashboard</h1>
                        <p className='text-[#0886A0]  font-medium'>Your Personalized Profile Overview</p>
                    </div>
                </Zoom>

                <Fade delay={10} triggerOnce>
                    <div className="bg-white rounded-lg shadow-lg mx-auto overflow-hidden relative p-3">
                        <div className="relative">
                            <img
                                src={cover}
                                alt="Cover"
                                className="w-full h-44 object-cover rounded-lg"
                            />
                            <div className="absolute left-3 md:left-6 -bottom-9 z-1">
                                <div className="w-24 h-24 rounded-full overflow-hidden p-1 bg-white">
                                    <img
                                        src={userData[0]?.image || userImg}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pt-5 mt-4">
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-semibold mt-4 text-gray-800">
                                    {userData[0]?.name || 'Anonymous'}
                                </h1>
                                <div className="flex items-center mt-3">
                                    <MdEmail className="text-gray-500 mr-2" />
                                    <p className=" text-gray-500">
                                        {userData[0]?.email || 'No Email Available'}
                                    </p>
                                    <div className="flex items-center pl-5">
                                    <MdPhone className="text-gray-500 mr-2" />
                                    <p className=" text-gray-500">
                                        {userData[0]?.phone || '12345678910'}
                                    </p>
                                </div>
                                </div>
                                
                            </div>
                            <div className="mt-6 absolute left-64 bottom-[50px]">
                                <button
                                    className={`flex items-center px-4 py-1 text-white rounded-full text-sm font-medium shadow-lg cursor-default ${userData[0]?.role === "Admin"
                                        ? "bg-gradient-to-r from-green-400 to-green-600"
                                        : userData[0]?.role === "Student"
                                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                                            : "bg-gradient-to-r from-blue-400 to-blue-600"
                                        }`}
                                >
                                    <MdWork className="text-white mr-1" />
                                    <span>
                                        {userData[0]?.role || "No role Available"}
                                    </span>
                                </button>

                            </div>
                        </div>
                    </div>
                </Fade>
                <ProfileCard name={userData[0]?.name} email={userData[0]?.email}></ProfileCard>
            </div>
        </div>
    );
};

export default Profile;