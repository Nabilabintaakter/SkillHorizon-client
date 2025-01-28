import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { FaUserFriends, FaTasks, FaClipboardList, FaPlusCircle } from 'react-icons/fa';
import { Button } from '@headlessui/react';
import AddAssignmentModal from './AddAssignmentModal';
import AssignmentTableRow from './AssignmentTableRow';
import { AiOutlineFileExclamation } from 'react-icons/ai';
import { Zoom } from 'react-awesome-reveal';

const MyClassAssignment = () => {
    const { id, email } = useParams();
    const axiosSecure = useAxiosSecure();
    let [isOpen, setIsOpen] = useState(false);
    function close() {
        setIsOpen(false);
        document.title = `Assignments | SkillHorizon`;
    }

    // for class
    const { data: classData = {}, isLoading: isClassLoading, refetch: refetchClass } = useQuery({
        queryKey: ['class', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-class-assignment/${id}`);
            return data;
        },
    });
    const { data: assignments = [], isLoading: isAssignmentsLoading, refetch: refetchAssignments } = useQuery({
        queryKey: ['assignments', id, email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/assignments?teacherEmail=${email}&classId=${id}`);
            return data;
        },
        onError: (err) => {
            console.error("Error fetching assignments:", err);
        },
        // Optional: Trigger refetch on params change (like email or id)
        enabled: !!id && !!email,
    });

    // for total assignments submission
    const { data: submissionData = [] } = useQuery({
        queryKey: ['submissions', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-class-assignment/submissions/${id}`);
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
    // Loading state check
    if (isClassLoading || isAssignmentsLoading) return <LoadingSpinner />;

    if (email === classData?.email) {
        return (
            <div className="container mx-auto py-4 md:py-8 px-4 lg:px-5 xl:px-9 pb-10">
                <Zoom triggerOnce>
                    <div className="text-center mb-8">
                        <h1 className='text-black mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto'>
                            {classData?.title ? `${classData.title}` : 'Class Progress Dashboard'}
                        </h1>
                        <p className='text-[#0886A0] font-medium'>Track enrollments, assignments, and submissions efficiently</p>
                    </div>
                </Zoom>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-blue-50 p-2 shadow-md text-center rounded-lg">
                        <FaUserFriends className="text-blue-600 text-3xl mx-auto mb-2 mt-1" />
                        <h2 className="text-xl font-semibold text-gray-700">Total Enrollments</h2>
                        <p className="text-2xl font-bold text-blue-800 mt-1">{classData?.totalEnrollment}</p>
                    </div>
                    <div className="bg-green-50 p-2 shadow-md text-center rounded-lg">
                        <FaTasks className="text-green-600 text-3xl mx-auto mb-2 mt-1" />
                        <h2 className="text-xl font-semibold text-gray-700">Total Assignments</h2>
                        <p className="text-2xl font-bold text-green-800 mt-1">{assignments?.length}</p>
                    </div>
                    <Link to={`/dashboard/my-class-assignment-submissions/${id}`} className="bg-purple-50 p-2 shadow-md text-center col-span-2 md:col-span-1 rounded-lg">
                        <FaClipboardList className="text-purple-600 text-3xl mx-auto mb-2 mt-1" />
                        <h2 className="text-xl font-semibold text-gray-700">Total Submissions</h2>
                        <p className="text-2xl font-bold text-purple-800 mt-1">{submissionData?.length}</p>
                    </Link>
                </div>
                {assignments.length > 0 && <div className="mt-6">
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold rounded-md shadow-lg hover:from-blue-400 hover:to-indigo-600 transition-colors duration-500 flex items-center justify-center space-x-2"
                    >
                        <FaPlusCircle className="text-white" />
                        <span className="">Create Assignment</span>
                    </Button>
                    <div className='my-5 md:my-3'>
                        <p className='text-gray-600'>
                            You’ve added <span className='text-black text-xl'>{assignments.length}</span> assignments for this class.
                        </p>
                    </div>

                </div>}

                {/* AddAssignmentModal */}
                <AddAssignmentModal
                    isOpen={isOpen}
                    close={close}
                    refetch={refetchClass}
                    classData={classData}
                    refetchAssignments={refetchAssignments}
                    refetchClass={refetchClass}
                />
                {assignments.length > 0 ? (
                    <div className="overflow-x-auto mt-2">
                        <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
                            {/* Table Header */}
                            <thead>
                                <tr className="bg-[#009478] text-left">
                                    <th className="px-4 py-2 text-white"></th>
                                    <th className="px-4 py-2 text-white">Assignment Title</th>
                                    <th className="px-4 py-2 text-white">Description</th>
                                    <th className="px-4 py-2 text-white">Deadline</th>
                                </tr>
                            </thead>
                            {/* Table Body */}
                            <tbody>
                                {currentAssignments.map((assignment, index) => (
                                    <AssignmentTableRow key={assignment._id} index={index} offset={offset} assignment={assignment} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-8 space-y-4 text-center">
                        <AiOutlineFileExclamation className="text-red-400 text-6xl" />
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-600">
                            No Assignments Yet
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base max-w-md">
                            It looks like no assignments have been added to this class yet. Click the "Create Assignment" button to get started and organize your class efficiently!
                        </p>
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-md shadow-lg hover:from-red-400 hover:to-pink-500 transition-colors duration-500 flex items-center justify-center space-x-2"
                        >
                            <FaPlusCircle className="text-white" />
                            <span>Create Assignment</span>
                        </Button>
                    </div>

                )}
                {/* Pagination and Showing range */}
                {
                    assignments.length > 0 && <div className="mt-10 flex justify-between items-center">
                        <p className="text-gray-800 text-sm md:text-base">
                            Showing <span className="text-black text-sm md:text-xl">{startItem}</span>-<span className="text-black text-sm md:text-xl">{endItem}</span> of <span className="text-black text-sm md:text-xl">{assignments.length}</span> assignments
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
                }
            </div>
        );
    }
};

export default MyClassAssignment;
