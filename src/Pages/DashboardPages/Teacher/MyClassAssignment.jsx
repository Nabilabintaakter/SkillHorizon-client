import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { FaUserFriends, FaTasks, FaClipboardList, FaPlusCircle } from 'react-icons/fa';
import { Button } from '@headlessui/react';
import AddAssignmentModal from './AddAssignmentModal';
import useAuth from '../../../hooks/useAuth';
import AssignmentTableRow from './AssignmentTableRow';
import { AiOutlineFileExclamation } from 'react-icons/ai';

const MyClassAssignment = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    let [isOpen, setIsOpen] = useState(false);
    function close() {
        setIsOpen(false);
    }

    // for class
    const { data: classData = {}, isLoading: isClassLoading, refetch: refetchClass } = useQuery({
        queryKey: ['class', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-class-assignment/${id}`);
            return data;
        },
    });
    // for assignment
    const { data: assignments = [], isLoading: isAssignmentsLoading, refetch: refetchAssignments } = useQuery({
        queryKey: ['assignments', id, user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/assignments?teacherEmail=${user?.email}&classId=${id}`);
            return data;
        },
        onError: (err) => {
            console.error("Error fetching assignments:", err);
        }
    });
    // for total assignments submission
    const { data: submissionData = [] } = useQuery({
        queryKey: ['submissions', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-class-assignment/submissions/${id}`);
            return data;
        },
    });

    // Loading state check
    if (isClassLoading || isAssignmentsLoading) return <LoadingSpinner />;

    if (user?.email === classData?.email) {
        return (
            <div className="container mx-auto py-4 md:py-8 px-4 lg:px-5 xl:px-9">
                <div className="text-center mb-8">
                    <h1 className='text-black mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto'>
                        {classData?.title ? `${classData.title}` : 'Class Progress Dashboard'}
                    </h1>
                    <p className='text-[#0886A0] font-medium'>Track enrollments, assignments, and submissions efficiently</p>
                </div>

                {assignments.length > 0 && <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-blue-50 p-2 shadow-md text-center rounded-lg">
                            <FaUserFriends className="text-blue-600 text-3xl mx-auto mb-2 mt-1" />
                            <h2 className="text-xl font-semibold text-gray-700">Total Enrollment</h2>
                            <p className="text-2xl font-bold text-blue-800 mt-1">{classData?.totalEnrollment}</p>
                        </div>
                        <div className="bg-green-50 p-2 shadow-md text-center rounded-lg">
                            <FaTasks className="text-green-600 text-3xl mx-auto mb-2 mt-1" />
                            <h2 className="text-xl font-semibold text-gray-700">Total Assignments</h2>
                            <p className="text-2xl font-bold text-green-800 mt-1">{assignments?.length}</p>
                        </div>
                        <Link to={`/dashboard/my-class-assignment-submissions/${id }`} className="bg-purple-50 p-2 shadow-md text-center rounded-lg">
                            <FaClipboardList className="text-purple-600 text-3xl mx-auto mb-2 mt-1" />
                            <h2 className="text-xl font-semibold text-gray-700">Total Submissions</h2>
                            <p className="text-2xl font-bold text-purple-800 mt-1">{submissionData?.length}</p>
                        </Link>
                    </div>
                    <div className="mt-3">
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold rounded-md shadow-lg hover:from-blue-400 hover:to-indigo-600 transition-colors duration-500 flex items-center justify-center space-x-2"
                        >
                            <FaPlusCircle className="text-white" />
                            <span className="">Create Assignment</span>
                        </Button>
                    </div>
                </>}

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
                                {assignments.map((assignment, index) => (
                                    <AssignmentTableRow key={assignment._id} index={index} assignment={assignment} />
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
            </div>
        );
    }
};

export default MyClassAssignment;
