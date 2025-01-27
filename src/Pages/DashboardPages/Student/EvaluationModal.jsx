import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Importing icons from react-icons

const EvaluationModal = ({ isOpen, close }) => {
    const [rating, setRating] = useState(0); // State for the star rating
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    // Handle star click
    const handleStarClick = (value) => {
        setRating(value);
    };

    const onSubmit = async (data) => {
        const evaluationData = {
            teacherEmail: "teacher-email", 
            rating: rating, 
            ...data,
        };
        try {
            await axiosSecure.post("/submit-evaluation", evaluationData);
            toast.success("Evaluation submitted successfully");
            reset();
            close(); 
        } catch (error) {
            toast.error("Failed to submit evaluation");
        }
    };

    // Function to render stars based on the current rating
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-yellow-400 text-3xl cursor-pointer hover:text-yellow-300 transition-all duration-200" onClick={() => handleStarClick(i)} />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-3xl cursor-pointer hover:text-yellow-300 transition-all duration-200" onClick={() => handleStarClick(i)} />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400 text-3xl cursor-pointer hover:text-yellow-300 transition-all duration-200" onClick={() => handleStarClick(i)} />);
            }
        }
        return stars;
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-6">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg bg-gradient-to-tl from-[#85e8a3] to-[#139196] rounded-lg shadow-xl p-8 font-josefin">
                                <Dialog.Title className="text-3xl font-semibold text-white text-center">
                                    Submit Your Teacher Evaluation
                                </Dialog.Title>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    {/* Rating Input for Teacher */}
                                    <div className="flex flex-col">
                                        <div className="mt-4 flex justify-center space-x-2">
                                            {renderStars()} 
                                        </div>
                                    </div>

                                    {/* Comments Input */}
                                    <div className="flex flex-col">
                                        <textarea
                                            id="comments"
                                            {...register("comments")}
                                            className="mt-4 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            placeholder="Add your comments about the teacher here"
                                        />
                                    </div>

                                    {/* Submit and Cancel Buttons */}
                                    <div className="flex justify-between mt-8 space-x-4">
                                        <button
                                            type="button"
                                            onClick={close}
                                            className="w-1/2 px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-all duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="w-1/2 px-6 py-3 text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EvaluationModal;
