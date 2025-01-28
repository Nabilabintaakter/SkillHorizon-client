
import { Link, useParams } from 'react-router-dom';
import Container from '../../../Shared/Container/Container';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { FaChalkboardTeacher, FaEnvelope, FaDollarSign, FaUserGraduate, FaInfoCircle, FaMoneyBillWave } from 'react-icons/fa';
import React, { useEffect } from 'react';
const Details = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure();
    const { data: classData = [], isLoading } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/class/${id}`)
            return data
        },
    })
    useEffect(() => {
        document.title = `${classData?.title} | SkillHorizon`;
    }, [classData?.title])
    if (isLoading) return <LoadingSpinner></LoadingSpinner>



    return (
        <div className='bg-green-50 py-5 md:pb-10'>
            <Container>
                <div className='mb-5 md:mb-6'>
                    <h1 className="w-[90%] lg:w-[50%] mx-auto text-center text-2xl md:text-xl font-semibold mb-2 text-gray-800">
                        Explore the details of this class, including its opportunities. Join now and enhance your skills!
                    </h1>
                </div>

                <div className='lg:mx-10 xl:mx-20 flex flex-col md:flex-row gap-5 p-3 border-[1px] border-[#369fad79] rounded-lg shadow-lg backdrop-blur-md'>
                    {/* Image Section */}
                    <div className='md:w-1/2 rounded-lg overflow-hidden shadow-md'>
                        <img
                            className='w-full h-full object-cover'
                            src={classData?.image}
                            alt={classData?.title || 'Class Image'}
                        />
                    </div>

                    {/* Details Section */}
                    <div className='md:w-1/2 flex flex-col justify-between'>
                        {/* Class Title */}
                        <div className='mb-2'>
                            <h3 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                                {classData?.title || 'Class Title'}
                            </h3>
                        </div>

                        {/* Class Information */}
                        <div className='space-y-3 text-gray-500'>
                            <p className='flex items-center gap-2 text-lg'>
                                <span>{classData?.description || 'No description available for this class.'}</span>
                            </p>
                            <p className='flex text-gray-700 items-center gap-2'>
                                <FaChalkboardTeacher className="text-blue-500" />
                                <span><b>Instructor:</b> {classData?.name || 'Unknown'}</span>
                            </p>
                            <p className='flex text-gray-700 items-center gap-2'>
                                <FaEnvelope className="text-red-500" />
                                <span><b>Email:</b> {classData?.email || 'Not provided'}</span>
                            </p>
                            <p className='flex text-gray-700 items-center gap-2'>
                                <FaDollarSign className="text-green-500" />
                                <span><b>Price:</b> ${classData?.price || '0.00'}</span>
                            </p>
                            <p className='flex text-gray-700 items-center gap-2'>
                                <FaUserGraduate className="text-orange-500" />
                                <span><b>Enrolled:</b> {classData?.totalEnrollment
                                    || '0'}</span>
                            </p>
                            <p className='flex text-gray-700 items-center gap-2'>
                                <FaInfoCircle className="text-purple-500" />
                                <span><b>Status:</b> <span className='text-green-500'>{classData?.status || 'N/A'}</span></span>
                            </p>
                        </div>

                        {/* Pay Button */}
                        <Link to={`/payment/${classData._id}`} className='mt-6 py-3 px-6 bg-gradient-to-br from-[#66BE80] to-[#139196] text-white hover:bg-bg-gradient-to-br hover:from-[#139196] hover:to-[#139196] cursor-pointer rounded-md btn border-none transition duration-300 flex items-center justify-center gap-3 shadow-md'>
                            <FaMoneyBillWave className="text-white text-xl" /> Pay Now
                        </Link>
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default Details;