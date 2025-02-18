import React, { useState } from 'react';
import { Transition } from '@headlessui/react'; // For smooth transitions
import Heading from '../../Shared/Heading/Heading';
import BeAMember from './BeAMemner';

const FAQ = () => {
    const [openItems, setOpenItems] = useState([]); // Track open accordion items

    const questions = [
        {
            question: 'What is SkillHorizon?',
            answer: 'SkillHorizon is an innovative online learning platform designed to connect students with expert instructors and provide high-quality educational resources. We offer a wide range of courses to help you enhance your skills and achieve your learning goals.'
        },
        {
            question: 'How do I enroll in a course?',
            answer: 'Enrolling in a course is easy! Simply browse our course catalog, select the course you are interested in, and click the "Enroll Now" button. Follow the on-screen instructions to complete the enrollment process.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We currently accept payments exclusively through Stripe.  This secure payment gateway allows you to use a variety of payment methods, including credit cards (Visa, Mastercard, American Express), debit cards, and other payment options depending on your region.  Stripe handles all payment processing, ensuring your financial information remains secure.'
        },
        {
            question: 'Can I get a refund if I am not satisfied with a course?',
            answer: 'Yes, we offer a refund policy for our courses. If you are not satisfied with a course for any reason, you can request a refund within 7 days of your purchase. Please refer to our Refund Policy for more details.'
        },
        {
            question: 'How do I contact support?',
            answer: 'If you have any questions or need assistance, you can easily contact our support team. Visit our "Contact" page for information on how to reach us via email, phone, or live chat.'
        },
        {
            question: 'Do I get a certificate after completing a course?',
            answer: 'Yes, upon successful completion of a course, you will receive a digital certificate of completion.  This certificate can be downloaded and shared as proof of your newly acquired skills.'
        },
    ];

    const toggleAccordion = (index) => {
        setOpenItems((prevOpenItems) => {
            if (prevOpenItems.includes(index)) {
                return prevOpenItems.filter((item) => item !== index); // Close
            } else {
                return [...prevOpenItems, index]; // Open
            }
        });
    };

    return (
        <section className="bg-gray-100 dark:bg-[#282834] pt-5 min-h-screen ">
            <div className="container mx-auto px-4">
                <Heading subtitle={"FAQ's"} title={'Frequently Asked Questions'}></Heading>
                <div className="space-y-2">
                    {questions.map((item, index) => (
                        <div key={index} className="bg-white dark:bg-[#353543] dark:text-white rounded-lg shadow-md overflow-hidden">
                            <div
                                className="flex items-center justify-between px-6 py-4 cursor-pointer"
                                onClick={() => toggleAccordion(index)}
                            >
                                <h3 className="text-lg font-medium">{item.question}</h3>
                                <svg
                                    className={`w-6 h-6 transition-transform ${openItems.includes(index) ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                            <Transition
                                show={openItems.includes(index)}
                                enter="transition-opacity"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="px-6 py-4 bg-gray-50 dark:bg-[#353543]">
                                    <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                                </div>
                            </Transition>
                        </div>
                    ))}
                </div>
            </div>
            <BeAMember></BeAMember>
        </section>
    );
};

export default FAQ;