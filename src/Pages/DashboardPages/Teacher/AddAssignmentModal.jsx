import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";

const AddAssignmentModal = ({ isOpen, close, classData,refetchAssignments,refetchClass }) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    // useMutation hook
    // const queryClient = useQueryClient()
    // const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async assignmentInfo => {
            await axiosSecure.post(`/assignments`, assignmentInfo)
        },
        onSuccess: () => {
            console.log('assignment data saved')
            // queryClient.invalidateQueries({ queryKey: ['classes'] })
        },
        onError: err => {
            console.log(err.message)
        },
    })
    const onSubmit = async (data) => {
        const assignmentInfo = {
            classId: classData?._id,
            className: classData?.title,
            teacherEmail: classData?.email,
            ...data,
        }
        try {
            await mutateAsync(assignmentInfo)
            refetchClass();
            refetchAssignments();
            reset();
            close();
            toast.success('Assignment added successfully!');

        } catch (error) {
            toast.error(error.message)
        }
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
                    <div className="flex items-center justify-center min-h-full p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg bg-gray-50  rounded-lg shadow-lg p-6 font-josefin">
                                <Dialog.Title className="text-xl font-semibold text-gray-800">
                                    Create New Assignment
                                </Dialog.Title>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="mt-6 space-y-6"
                                >
                                    {/* Assignment Title */}
                                    <div>
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-800 mb-2"
                                        >
                                            Assignment Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            {...register("title", { required: "Title is required" })}
                                            placeholder="Enter assignment title"
                                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 placeholder-gray-400"
                                        />
                                        {errors.title && (
                                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                        )}
                                    </div>

                                    {/* Assignment Deadline */}
                                    <div>
                                        <label
                                            htmlFor="deadline"
                                            className="block text-sm font-medium text-gray-800 mb-2"
                                        >
                                            Assignment Deadline <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="deadline"
                                            {...register("deadline", {
                                                required: "Deadline is required",
                                                validate: (value) => {
                                                    const selectedDate = new Date(value);
                                                    const currentDate = new Date();
                                                    currentDate.setHours(0, 0, 0, 0); // Normalize current date to midnight
                                                    return (
                                                        selectedDate >= currentDate || "Deadline cannot be in the past"
                                                    );
                                                },
                                            })}
                                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                                        />
                                        {errors.deadline && (
                                            <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
                                        )}
                                    </div>

                                    {/* Assignment Description */}
                                    <div>
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-800 mb-2"
                                        >
                                            Assignment Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={4}
                                            {...register("description", {
                                                required: "Description is required",
                                            })}
                                            placeholder="Write a brief description"
                                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 placeholder-gray-400"
                                        />
                                        {errors.description && (
                                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                        )}
                                    </div>

                                    {/* Submit and Cancel Buttons */}
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={close}
                                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        >
                                            {isPending ? (
                                                <p className="flex items-center gap-2">
                                                    Saving...
                                                    <ImSpinner9 className="animate-spin m-auto text-sm" />
                                                </p>
                                            ) : (
                                                'Add Assignment'
                                            )}
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

export default AddAssignmentModal;
