import React, { useEffect, useState } from 'react';
import Container from '../../Shared/Container/Container';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");

    const { data: classData = [], isLoading, isError, error } = useQuery({
        queryKey: ['class', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/class/${id}`);
            return data;
        },
    });

    // Fetch clientSecret from server when price is available
    useEffect(() => {
        if (classData?.price) {
            axiosSecure.post('/create-payment-intent', { price: classData?.price })
                .then((res) => {
                    console.log('Client Secret:', res.data.clientSecret); // ডিবাগের জন্য লগ
                    setClientSecret(res.data.clientSecret); // সঠিকভাবে সেট হচ্ছে কিনা নিশ্চিত করুন
                })
                .catch((err) => {
                    console.error('Error fetching clientSecret:', err);
                });
        }
    }, [classData?.price, axiosSecure]);


    if (isLoading) return <LoadingSpinner />;

    if (isError) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-screen -mt-[64px]">
                    <p className="text-red-500 text-lg font-semibold">
                        Error: {error.message}
                    </p>
                </div>
            </Container>
        );
    }

    const price = classData?.price || 0;

    return (
        <Container>
            <div className="bg-[#FFFFFF] flex justify-center items-center min-h-screen -mt-[64px]">
                <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto">
                    <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                        Complete Your Payment
                    </h2>
                    <div className="bg-[#f1fbf45c] rounded-md border-[1px] border-[#139196] p-3 md:p-4">
                        <div className="flex justify-between items-center md:text-xl lg:text-2xl font-black">
                            <p>Total</p>
                            <p className="text-[#139196]">${price.toFixed(2)}</p>
                        </div>
                        <small className="text-gray-700 font-normal line-through mr-2 text-base text-right block mb-3">
                            $1000
                        </small>

                        <div>
                            {clientSecret ? (
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <CheckoutForm price={price} clientSecret={clientSecret} />
                                </Elements>
                            ) : (
                                <p className="text-gray-500 text-center mt-4">
                                    Preparing payment, please wait...
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Payment;
