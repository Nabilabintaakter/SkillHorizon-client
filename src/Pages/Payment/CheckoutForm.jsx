import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [transactionId, setTransactionId]= useState("");
    // const navigate = useNavigate();

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
            if(paymentIntent?.status === "succeeded"){
              setTransactionId(paymentIntent?.id)
              toast.success("Payment Successful!")
              // navigate('/dashboard/my-enroll-class')
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <button
                disabled={!stripe}
                className={`mt-4 px-4 py-1 w-full  rounded bg-green-600 text-white font-semibold transition ${
                    !stripe ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"
                }`}
            >
                Pay
            </button>

            {transactionId && <p className="text-green-500 mt-2">Your Transaction Id is: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
