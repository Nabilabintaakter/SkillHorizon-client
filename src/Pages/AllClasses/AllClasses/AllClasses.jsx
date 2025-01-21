import React from 'react';
import Container from '../../../Shared/Container/Container';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { FaEnvelope, FaInfoCircle, FaThList, FaUser } from 'react-icons/fa';
import { MdOutlineJoinFull } from 'react-icons/md';

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();
    const { data: classes = [], isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/all-classes`)
            return data
        },
    })
    console.log(classes)
    if (isLoading) return <LoadingSpinner></LoadingSpinner>



    return (
        <div className='bg-gray-50 py-5 min-h-screen md:pb-10'>
            <Container>
                <div className='mb-5 md:mb-6'>
                    <h2 className="text-center text-2xl lg:text-3xl font-semibold mb-2 text-gray-800">Discover All Classes</h2>
                    <p className="text-gray-500 mb-4 w-[90%] md:w-[45%] mx-auto text-center lg:text-lg">Browse through a wide range of classes with details on instructors, pricing, and enrollments. Enroll today!</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {
                        classes.length > 0 ?

                            classes.map((classItem, index) => (


                                <div key={index} className=" bg-white drop-shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">

                                    {/* Image */}
                                    <img
                                        src={classItem.image}
                                        alt={classItem.title}
                                        className="w-full h-52 md:h-44 lg:h-36 object-cover"
                                    />

                                    {/* Content */}
                                    <div className="p-3 flex-grow">
                                        {/* Title & Price */}
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {classItem.title}
                                            </h3>
                                            <p className="text-2xl font-semibold text-green-500">
                                                ${classItem.price}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-500 flex items-start gap-2 mb-2">
                                            <FaInfoCircle className="text-base text-[#fac927] flex-shrink-0 w-4 h-4 mt-[2px]" />
                                            <span className="break-words">{classItem.description}</span>
                                        </p>

                                        {/* Name */}
                                        <p className="text-gray-800 flex items-center gap-2 ">
                                            <FaUser className="text-base text-[#229df0] w-4 h-4" />
                                            {classItem.name}
                                        </p>

                                        {/* total enrollment */}
                                        <p className="text-gray-800 flex items-center gap-2">
                                            <MdOutlineJoinFull className="text-base text-[#d85420] w-5 h-5" />
                                            {classItem.totalEnrollment > 0
                                                ? `${classItem.totalEnrollment} Enrollments`
                                                : "Be the first to enroll!"}
                                        </p>
                                    </div>

                                    {/* Buttons */}
                                    <div className="px-3 pb-3 flex items-center gap-1">
                                        <button disabled={classItem.status === "Pending" || classItem.status === "Rejected"} className="bg-gradient-to-br from-[#66BE80] to-[#139196] text-white hover:bg-bg-gradient-to-br hover:from-[#139196] hover:to-[#139196] cursor-pointer btn btn-sm border-none py-1 w-full rounded-md transition ">
                                        <FaEnvelope className="mb-[2px]" />  Enroll Now!
                                        </button>
                                    </div>
                                </div>
                            ))

                            :
                            (
                                <div className="col-span-full text-center py-16 flex flex-col items-center bg-[#fef2f2] rounded-lg shadow-md border-[1px] border-red-200">
                                    {/* Icon */}
                                    <FaThList className="text-6xl text-[#D32F2F] mb-6" />

                                    {/* Main Message */}
                                    <p className="text-red-600 text-2xl font-semibold mb-3">
                                        No Classes Available!
                                    </p>
                                </div>
                            )
                    }
                </div>
            </Container>
        </div>
    );
};

export default AllClasses;