import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ classData, clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { mutateAsync } = useMutation({
        mutationFn: async (paymentInfo) => {
            await axiosSecure.post('/payments', paymentInfo);
        },
        onSuccess: () => {
            console.log('Payment data saved');
        },
        onError: (err) => {
            console.error('Error saving payment data:', err.message);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) {
            setErrorMessage('Payment method not found.');
            return;
        }

        setIsProcessing(true);

        try {
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'Anonymous',
                        name: user?.displayName || 'Anonymous',
                    },
                },
            });

            if (confirmError) {
                setErrorMessage(confirmError.message);
                return;
            }

            if (paymentIntent?.status === 'succeeded') {
                const paymentInfo = {
                    classId: classData?._id,
                    studentEmail: user?.email,
                    transactionId: paymentIntent.id,
                    date: moment().utc().format(),
                };

                await mutateAsync(paymentInfo);
                toast.success('Payment Successful!');
                navigate('/dashboard/my-enroll-class');
            }
        } catch (err) {
            toast.error('An error occurred during payment.');
            console.error(err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={`mt-4 px-4 py-2 w-full rounded bg-green-600 text-white font-semibold ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500'
                }`}
            >
                {isProcessing ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default CheckoutForm;
