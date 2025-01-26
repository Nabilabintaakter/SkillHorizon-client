import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const EnrollClassDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: assignments = [], isLoading, refetch } = useQuery({
        queryKey: ['assignments', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-enroll-class/assignment/${id}`);
            return data;
        },
    });
    console.log(assignments);
    if (isLoading) return <LoadingSpinner />;
    return (
        <div>
            EnrollClassDetails of {id}
        </div>
    );
};

export default EnrollClassDetails;