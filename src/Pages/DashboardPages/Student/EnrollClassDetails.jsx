import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaThList } from 'react-icons/fa';
import StudentAssignmentRow from './StudentAssignmentRow';
import { FcFeedback } from "react-icons/fc";
import { Button } from '@headlessui/react';
import EvaluationModal from './EvaluationModal';

const EnrollClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    let [isOpen, setIsOpen] = useState(false);
    function close() {
        setIsOpen(false);
        document.title = `Assignments | SkillHorizon`;
    }

    const { data: assignments = [], isLoading, refetch } = useQuery({
        queryKey: ['assignments', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-enroll-class/assignment/${id}`);
            return data;
        },
    });

    useEffect(() => {
        document.title = `Assignments | SkillHorizon`;
    }, [])
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    // Pagination logic
    const offset = currentPage * itemsPerPage;
    const currentAssignments = assignments.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(assignments.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Calculate the range of items being displayed
    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min((currentPage + 1) * itemsPerPage, assignments.length);
    if (isLoading) return <LoadingSpinner />;
    return (
        <div className="container mx-auto py-4 md:py-8 px-4 lg:px-5 xl:px-9">
            {currentAssignments.length > 0 && <div className="text-center mb-8">
                <h1 className='text-black mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto'>
                    {currentAssignments.length > 0 && (
                        [...new Set(assignments.map(item => item?.className))].map((uniqueClassName, index) => (
                            <p key={index}>
                                {uniqueClassName}
                            </p>
                        ))
                    )}
                </h1>
                <p className='text-[#0886A0] font-medium'>
                    Stay updated on your class assignments, deadlines, and progress all in one place.
                </p>
            </div>}
            {currentAssignments.length > 0 ?
                <div className="overflow-x-auto mt-4">
                    <div className='flex justify-between mb-1'>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                            Assignment Details
                        </h2>
                        {/* Feedback Button */}
                        <div>
                            <Button
                                onClick={() => setIsOpen(true)}
                                className="text-white rounded-[5px] bg-gradient-to-br from-[#66BE80] to-[#139196] w-fit font-medium hover:bg-bg-gradient-to-br hover:from-[#139196] hover:to-[#139196] cursor-pointer px-3 py-1 md:px-5 md:py-2 flex gap-2 items-center duration-1000 ease-in-out transition-all"
                            >
                                <FcFeedback className="text-white text-lg" />
                                <span>Teaching Evaluation Report</span>
                            </Button>
                        </div>
                        {/* EvaluationModal */}
                        {assignments.length > 0 && (
                            [...new Set(assignments.map(item => item?.className))].map((uniqueClassName, index) => (
                                <EvaluationModal
                                    key={index}
                                    isOpen={isOpen}
                                    close={close}
                                    uniqueClassName={uniqueClassName}
                                />
                            ))
                        )}

                    </div>
                    <div className='mt-1 mb-2'>
                        <p className='text-gray-600'>
                            <span className='text-black text-xl'>{assignments.length}</span> Assignments Available for You. Complete Them to Continue Your Learning Journey!
                        </p>
                    </div>

                    <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
                        {/* Table Header */}
                        <thead>
                            <tr className="bg-[#009478] text-left text-sm md:text-base">
                                <th className="px-4 py-2 text-white"></th>
                                <th className="px-4 py-2 text-white">Assignment Title</th>
                                <th className="px-4 py-2 text-white">Description</th>
                                <th className="px-4 py-2 text-white">Deadline</th>
                                <th className="px-4 py-2 md:px-7 text-white">Action</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {currentAssignments.map((assignment, index) => (
                                <StudentAssignmentRow key={assignment._id} index={index} assignment={assignment} />
                            ))}
                        </tbody>
                    </table>
                </div>
                : (
                    <div>
                        <div className="text-center mb-8">
                            <h1 className="text-black mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto">
                                Class Progress Tracker
                            </h1>
                            <p className="text-[#0886A0] font-medium">
                                Stay updated on your class assignments, deadlines, and progress all in one place.
                            </p>
                        </div>
                        <div className="col-span-full text-center py-16 flex flex-col items-center bg-[#fef2f2] rounded-lg shadow-md">
                            <FaThList className="text-6xl text-[#D32F2F] mb-6" />
                            <p className="text-red-600 text-2xl font-semibold mb-3">
                                No Assignments Found
                            </p>
                            <p className="text-gray-500 text-md mb-6 xl:w-[50%] mx-auto px-5">
                                It looks like no assignments have been added to this class yet.
                            </p>
                        </div>
                    </div>
                )}
            {/* Pagination and Showing range */}
            <div className="mt-10 flex justify-between items-center">
                <p className="text-gray-800">
                    Showing <span className="text-black text-xl">{startItem}</span>-<span className="text-black text-xl">{endItem}</span> of <span className="text-black text-xl">{assignments.length}</span> assignments
                </p>
                <ReactPaginate
                    previousLabel={'← Previous'}
                    nextLabel={'Next →'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination flex justify-center gap-3'}
                    pageClassName={'bg-[#e3edf2] px-3 py-1 rounded-md shadow-sm hover:bg-[#f0f4f8]'}
                    pageLinkClassName={'text-[#139196] font-medium hover:text-gray-800'}
                    activeClassName={'bg-[#139196] text-white font-semibold shadow-md'}
                    previousClassName={'px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800'}
                    nextClassName={'px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800'}
                    disabledClassName={'bg-gray-200 cursor-not-allowed'}
                    breakClassName={'text-gray-800'}
                />
            </div>
        </div>
    );
};

export default EnrollClassDetails;