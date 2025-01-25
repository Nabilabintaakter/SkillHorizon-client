import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { FaUserFriends, FaTasks, FaClipboardList, FaPlusCircle } from 'react-icons/fa';
import { Button } from '@headlessui/react';
import AddAssignmentModal from './AddAssignmentModal';
import useAuth from '../../../hooks/useAuth';
import AssignmentTableRow from './AssignmentTableRow';

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

    // for assignments
    const { data: assignments = [], isLoading: isAssignmentsLoading, refetch: refetchAssignments } = useQuery({
        queryKey: ['assignments', id, user?.email], // Unique key with classId and teacher's email
        queryFn: async () => {
            const { data } = await axiosSecure(`/assignments?teacherEmail=${user?.email}&classId=${id}`);
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-2 shadow-md text-center rounded-lg">
                        <FaUserFriends className="text-blue-600 text-3xl mx-auto mb-2" />
                        <h2 className="text-xl font-semibold text-gray-700">Total Enrollment</h2>
                        <p className="text-2xl font-bold text-blue-800 mt-1">0</p>
                    </div>
                    <div className="bg-green-50 p-2 shadow-md text-center rounded-lg">
                        <FaTasks className="text-green-600 text-3xl mx-auto mb-2" />
                        <h2 className="text-xl font-semibold text-gray-700">Total Assignments</h2>
                        <p className="text-2xl font-bold text-green-800 mt-1">{assignments?.length}</p>
                    </div>
                    <div className="bg-purple-50 p-2 shadow-md text-center rounded-lg">
                        <FaClipboardList className="text-purple-600 text-3xl mx-auto mb-2" />
                        <h2 className="text-xl font-semibold text-gray-700">Total Submissions</h2>
                        <p className="text-2xl font-bold text-purple-800 mt-1">0</p>
                    </div>
                </div>

                <div className="mt-3">
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                        <FaPlusCircle className="text-white" />
                        <span className="">Create Assignment</span>
                    </Button>
                </div>

                {/* UPDATE MODAL */}
                <AddAssignmentModal
                    isOpen={isOpen}
                    close={close}
                    refetch={refetchClass} // refetching class data after assignment is added
                    classData={classData}
                    refetchAssignments={refetchAssignments}
                    refetchClass={refetchClass}
                />

                {/* Assignments Table */}
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
            </div>
        );
    }
};

export default MyClassAssignment;
