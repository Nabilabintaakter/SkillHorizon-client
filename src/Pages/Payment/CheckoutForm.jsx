import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ImSpinner9 } from 'react-icons/im';
import moment from 'moment'; // Import moment.js
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ classData, clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [transactionId, setTransactionId] = useState(""); 
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async paymentInfo => {
            await axiosSecure.post(`/payments`, paymentInfo);
        },
        onSuccess: () => {
            console.log('Payment data saved');
        },
        onError: err => {
            console.log(err.message);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        if (!card) {
            setErrorMessage("Payment method not found.");
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "Anonymous",
                    name: user?.displayName || "Anonymous",
                },
            },
        });

        if (confirmError) {
            console.error('Error during payment confirmation:', confirmError.message);
            setErrorMessage(confirmError.message);
        } else {
            console.log('Payment Successful:', paymentIntent);
            setErrorMessage("");
            if (paymentIntent?.status === "succeeded") {
                setTransactionId(paymentIntent?.id);

                // Save payment info in db
                const paymentInfo = {
                    classId: classData?._id,
                    email: user?.email,
                    transactionId: paymentIntent?.id,
                    date: moment().utc().format()
                };

                try {
                    await mutateAsync(paymentInfo);
                    console.log(paymentInfo);
                    toast.success("Payment Successful!");
                    setTransactionId(""); 
                    elements.getElement(CardElement).clear(); 
                    navigate('/dashboard/my-enroll-class')
                } catch (err) {
                    toast.error(err.message);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <button
                disabled={!stripe}
                className={`mt-4 px-4 py-1 w-full flex justify-center rounded bg-green-600 text-white font-semibold transition ${
                    !stripe ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"
                }`}
            >
                {isPending ? (
                    <p className="flex items-center gap-2">
                        Processing...
                        <ImSpinner9 className="animate-spin m-auto text-sm" />
                    </p>
                ) : (
                    'Pay'
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;
