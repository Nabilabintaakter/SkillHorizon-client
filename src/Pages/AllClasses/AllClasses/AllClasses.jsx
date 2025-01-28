import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Container from '../../../Shared/Container/Container';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { FaEnvelope, FaThList, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Heading from '../../../Shared/Heading/Heading';
import { Fade } from 'react-awesome-reveal';

const AllClasses = () => {
    useEffect(() => {
        document.title = 'All Classes | SkillHorizon';
    }, []);

    const axiosPublic = useAxiosPublic();
    const { data: classes = [], isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/all-classes`)
            return data;
        },
    });

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

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

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;

    return (
        <div className='py-5 min-h-screen md:pb-10'>
            <Container>
                <Heading subtitle={'All Classes'} title={'Unlock New Possibilities with Our Expert-Led Classes'} />
                <div className='-mt-5 mb-5'>
                    <p className='text-gray-600'>
                        Discover All <span className='text-black text-xl'>{classes.length}</span> Classes Available for You
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {
                        currentClasses.length > 0 ?
                            currentClasses.map((classItem, index) => (
                                <Fade delay={index * 0.8}>
                                    <div
                                        key={index}
                                        className="relative bg-white rounded-md overflow-hidden flex flex-col justify-between group hover:bg-gradient-to-br hover:from-[#66BE80] hover:to-[#139196] transition duration-500 ease-out h-[335px] md:h-[350px]"
                                    >
                                        {/* Image */}
                                        <img
                                            src={classItem.image}
                                            alt={classItem.title}
                                            className="w-full h-52 md:h-44 object-cover rounded-md group-hover:opacity-0 transition duration-300"
                                        />

                                        {/* Content */}
                                        <div className="py-3 mt-2 group-hover:p-5 flex-grow">
                                            {/* Title & Description */}
                                            <div className="group-hover:text-white transition duration-300 group-hover:absolute md:group-hover:top-20 group-hover:top-24 ">
                                                <h3 className="group-hover:leading-loose md:group-hover:leading-tight group-hover:pr-5 text-lg font-medium group-hover:font-bold text-black group-hover:text-white ">
                                                    {classItem.title}
                                                </h3>
                                            </div>

                                            <p className="text-gray-100 text-sm font-semibold group-hover:font-normal group-hover:opacity-100 opacity-0  group-hover:block absolute group-hover:top-32 md:group-hover:top-32 group-hover:w-auto group-hover:leading-loose md:group-hover:leading-tight lg:group-hover:leading-loose group-hover:pr-5">
                                                {classItem.description}
                                            </p>

                                            {/* teacher, price */}
                                            <div className="group-hover:hidden mt-3">
                                                <div className="text-gray-700 flex items-center gap-3">
                                                    <FaUserCircle className="text-2xl text-[#229df0]" />
                                                    <p>By </p>
                                                    <span className='text-black'>{classItem.name}</span>
                                                </div>
                                                <div className="mt-3 text-2xl font-bold text-[#139196]">
                                                    <small className='text-gray-400 font-normal line-through mr-2 text-base'>$1000</small>
                                                    ${classItem.price}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enrollments */}
                                        <span
                                            className={`absolute top-3 right-3 px-3 py-1 text-sm backdrop-blur-md text-green-500 bg-white/95 rounded-lg border-[1px] border-green-500 group-hover:hidden`}
                                        >
                                            {classItem.totalEnrollment > 0
                                                ? `${classItem.totalEnrollment} Enrollments`
                                                : "Be the first to enroll!"}
                                        </span>

                                        {/* Enroll Now Button */}
                                        <Link
                                            to={`/class/${classItem._id}`}
                                            className="p-5 flex items-center gap-1 group-hover:opacity-100 opacity-0 transition duration-500 group-hover:block absolute bottom-3 text-lg"
                                        >
                                            <button
                                                disabled={
                                                    classItem.status === "Pending" || classItem.status === "Rejected"
                                                }
                                                className="bg-[#F0BF79] text-black hover:bg-[#139196] hover:text-white cursor-pointer btn btn-md border-none rounded-md transition text-base"
                                            >
                                                <FaEnvelope className="mb-[2px] text-base" /> Enroll Now !
                                            </button>
                                        </Link>
                                    </div>
                                </Fade>
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

                {/* Pagination and Showing range */}
                <div className="mt-10 flex justify-between items-center">
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
                </div>
            </Container>
        </div>
    );
};

export default AllClasses;
