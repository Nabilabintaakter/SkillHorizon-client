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
    const [clientSecret, setClientSecret] = useState('');

    const { data: classData = {}, isLoading, isError, error } = useQuery({
        queryKey: ['class', id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/class/${id}`);
            return data;
        },
    });

    useEffect(() => {
        if (classData?.price) {
            axiosSecure
                .post('/create-payment-intent', { price: classData.price })
                .then(({ data }) => {
                    setClientSecret(data.clientSecret);
                    document.title = 'Payment | SkillHorizon';
                })
                .catch((err) => {
                    console.error('Error fetching clientSecret:', err);
                });
        }
    }, [classData?.price, axiosSecure]);

    if (isLoading) return <LoadingSpinner />;
    if (isError)
        return (
            <Container>
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-red-500 text-lg font-semibold">
                        Error: {error.message}
                    </p>
                </div>
            </Container>
        );

    const price = classData?.price || 0;

    return (
        <Container>
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
                <div className="w-full max-w-md">
                    <h2 className="text-center text-2xl lg:text-3xl font-semibold mb-4">
                        Complete Your Payment
                    </h2>
                    <div className="bg-gray-50 rounded border p-4">
                        <div className="flex justify-between text-xl md:text-2xl font-semibold">
                            <p>Total</p>
                            <p className="text-xl md:text-2xl text-[#139196] font-bold">${price.toFixed(2)}</p>
                        </div>
                        <small className="line-through text-gray-500 mb-4 flex justify-end">$1000</small>
                        {clientSecret ? (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm classData={classData} clientSecret={clientSecret} />
                            </Elements>
                        ) : (
                            <p className="text-gray-500 text-center mt-4">
                                Preparing payment, please wait...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Payment;
