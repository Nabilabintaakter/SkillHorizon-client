import React from 'react';
import Container from '../../Shared/Container/Container';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const Payment = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure();
    const { data: classData = [], isLoading } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/class/${id}`)
            return data
        },
    })
    console.log(classData)
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <Container>
            <div className='bg-[#FFFFFF] flex justify-center items-center min-h-screen -mt-[64px]'>
                <div className='w-full sm:w-[70%] md:w-[50%] lg:w-[40%] mx-aut0'>
                    <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-800 mb-4">Complete Your Payment</h2>
                    <div className='bg-[#f1fbf45c] rounded-md border-[1px] border-green-300 p-3 md:p-4'>
                        <div className='flex justify-between items-center md:text-xl lg:text-2xl font-black'>
                            <p>Total</p>
                            <p className=" text-[#139196]">
                                ${classData?.price}
                            </p>
                        </div>
                        <small className='text-gray-700 font-normal line-through mr-2 text-base text-right block mt-3'>$1000</small>
                        {/* Pay Button */}
                        <button className='mt-10 bg-gradient-to-br from-[#66BE80] to-[#139196] text-white hover:bg-bg-gradient-to-br hover:from-[#139196] hover:to-[#139196] cursor-pointer rounded-[4px] w-full btn btn-sm border-none transition duration-300 flex items-center justify-center gap-3 shadow-md'> Pay
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Payment;
