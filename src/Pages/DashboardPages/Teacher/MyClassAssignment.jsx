import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { FaUserFriends, FaTasks, FaClipboardList } from 'react-icons/fa';
import { Button } from '@headlessui/react';
import AddAssignmentModal from './AddAssignmentModal';
import useAuth from '../../../hooks/useAuth';

const MyClassAssignment = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    let [isOpen, setIsOpen] = useState(false)
    function close() {
        setIsOpen(false)
    }

    const { data: classData = {}, isLoading, refetch } = useQuery({
        queryKey: ['class', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-class-assignment/${id}`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    const { totalEnrollment = 0, totalAssignments = 0, totalSubmissions = 0 } = classData;

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
                    <div className="bg-blue-50 p-3 shadow-lg text-center rounded-lg">
                        <FaUserFriends className="text-blue-600 text-4xl mx-auto mb-3" />
                        <h2 className="text-xl font-semibold text-gray-700">Total Enrollment</h2>
                        <p className="text-3xl font-bold text-blue-800 mt-2">{totalEnrollment}</p>
                    </div>
                    <div className="bg-green-50 p-3 shadow-lg text-center rounded-lg">
                        <FaTasks className="text-green-600 text-4xl mx-auto mb-3" />
                        <h2 className="text-xl font-semibold text-gray-700">Total Assignments</h2>
                        <p className="text-3xl font-bold text-green-800 mt-2">{totalAssignments}</p>
                    </div>
                    <div className="bg-purple-50 p-3 shadow-lg text-center rounded-lg">
                        <FaClipboardList className="text-purple-600 text-4xl mx-auto mb-3" />
                        <h2 className="text-xl font-semibold text-gray-700">Total Submissions</h2>
                        <p className="text-3xl font-bold text-purple-800 mt-2">{totalSubmissions}</p>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                    >
                        Create Assignment
                    </Button>
                </div>

                {/* UPDATE MODAL */}
                <AddAssignmentModal
                    isOpen={isOpen}
                    close={close}
                    refetch={refetch}
                    classData={classData}
                />
            </div>
        );
    }

};

export default MyClassAssignment;