import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { FaThList, FaChalkboardTeacher } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyEnrollClass = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ['classes', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-enroll-class/${user?.email}`)
            return data
        },
    })

    useEffect(() => {
        document.title = `My Enrolled Classes | SkillHorizon`;
    }, [])
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    // Pagination logic
    const offset = currentPage * itemsPerPage;
    const currentClasses = classes.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(classes.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Calculate the range of items being displayed
    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min((currentPage + 1) * itemsPerPage, classes.length);
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="container mx-auto py-4 md:py-8 px-4 lg:px-5 xl:px-9">
            <div className="text-center mb-8">
                <h1 className="text-black mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto">
                    Enrolled Classes Overview
                </h1>
                <p className="text-[#0886A0] font-medium">
                    View all your enrolled classes in one place and seamlessly continue your learning journey.
                </p>
            </div>
            <div className='my-5'>
                <p className='text-gray-600'>
                    You’ve Enrolled in <span className='text-black text-xl'>{classes.length}</span> Classes. Continue Your Learning Journey!
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {
                    classes?.length > 0 ?
                        currentClasses.map((classItem, index) => (
                            <div key={index} className="relative bg-white drop-shadow-xl rounded-lg overflow-hidden flex flex-col justify-between transform transition-all duration-700 hover:scale-105">
                                {/* Image */}
                                <img
                                    src={classItem.image}
                                    alt={classItem.title}
                                    className="w-full h-52 md:h-40 object-cover rounded-t-lg"
                                />
                                {/* Content */}
                                <div className="p-4 flex-grow">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {classItem.title}
                                    </h3>

                                    {/* Name */}
                                    <p className='flex text-gray-700 items-center gap-2'>
                                        <FaChalkboardTeacher className="text-blue-500" />
                                        <span><b>Instructor:</b> {classItem?.email || 'Unknown'}</span>
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="px-4 pb-4">
                                    <Link to={`/dashboard/my-enroll-class/${classItem.id}`}
                                        className="bg-[#0d75ed] text-white btn btn-sm border-none py-2 w-full rounded-md hover:bg-[#15528f] transition">
                                        Continue
                                    </Link>
                                </div>
                            </div>
                        )) :
                        (
                            <div className="col-span-full text-center py-16 flex flex-col items-center bg-[#fef2f2] rounded-lg shadow-md">
                                <FaThList className="text-6xl text-[#D32F2F] mb-6" />
                                <p className="text-red-600 text-2xl font-semibold mb-3">
                                    No Classes Found
                                </p>
                                <p className="text-gray-500 text-md mb-6 xl:w-[50%] mx-auto px-5">
                                    You have not enrolled in any classes at this time. Explore our diverse range of classes and take the next step in your learning journey.
                                </p>
                                <Link to="/allClasses" className="text-white rounded-[5px] bg-gradient-to-br from-[#66BE80] to-[#139196] w-fit font-medium hover:bg-bg-gradient-to-br hover:from-[#139196] hover:to-[#139196] cursor-pointer px-5 md:px-6 py-2 md:py-3 flex justify-center items-center duration-1000 ease-in-out transition-all">
                                    Browse Available Classes
                                </Link>
                            </div>

                        )
                }
            </div>
            {/* Pagination and Showing range */}
            {classes?.length > 0 &&             <div className="mt-10 flex justify-between items-center">
                <p className="text-gray-800">
                    Showing <span className="text-black text-xl">{startItem}</span>-<span className="text-black text-xl">{endItem}</span> of <span className="text-black text-xl">{classes.length}</span> classes
                </p>
                <ReactPaginate
                    previousLabel={'← Previous'}
                    nextLabel={'Next →'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination flex justify-center gap-3 items-center'}
                    pageClassName={'bg-[#e3edf2] px-3 py-1 rounded-md shadow-sm hover:bg-[#f0f4f8]'}
                    pageLinkClassName={'text-[#139196] font-medium hover:text-gray-800'}
                    activeClassName={'bg-[#139196] text-white font-semibold shadow-md border-2 border-[#139196]'} // Active page color changes
                    previousClassName={'px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm md:text-base'}
                    nextClassName={'px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm md:text-base'}
                    disabledClassName={'bg-gray-200 cursor-not-allowed hover:text-white'}
                    breakClassName={'text-gray-800'}
                    style={{ height: '40px' }}
                />
            </div>}
        </div>
    );
};

export default MyEnrollClass;
