import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const AssignmentSubmissionModal = ({ isOpen, close, assignment }) => {
    const {user} = useAuth();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    // useMutation hook
    // const queryClient = useQueryClient()
    const axiosSecure = useAxiosSecure()
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async submissionInfo => {
            await axiosSecure.post(`/assignments-submission`, submissionInfo)
        },
        onSuccess: () => {
            console.log('assignment submission data saved')
            // queryClient.invalidateQueries({ queryKey: ['submissions'] })
        },
        onError: err => {
            console.log(err.message)
        },
    })
    const onSubmit = async (data) => {
        const submissionInfo = {
            classId:assignment?.classId,
            className: assignment?.className,
            assignmentTitle: assignment?.title,
            ...data,
            teacherEmail: assignment?.teacherEmail,
            studentEmail: user?.email
        }
        try {
            await mutateAsync(submissionInfo)
            reset();
            close();
            toast.success('Assignment submitted successfully!');

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
                                    Submit Assignment
                                </Dialog.Title>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="mt-6 space-y-6"
                                >
                                    {/* Assignment submittedUrl */}
                                    <div>
                                        <label
                                            htmlFor="submittedUrl"
                                            className="block text-sm font-medium text-gray-800 mb-2"
                                        >
                                            Assignment Link <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            id="submittedUrl"
                                            {...register("submittedUrl", { required: "link is required" })}
                                            placeholder="Enter assignment link"
                                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 placeholder-gray-400"
                                        />
                                        {errors.submittedUrl && (
                                            <p className="text-red-500 text-sm mt-1">{errors.submittedUrl.message}</p>
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
                                                    Submitting...
                                                    <ImSpinner9 className="animate-spin m-auto text-sm" />
                                                </p>
                                            ) : (
                                                'Submit'
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

export default AssignmentSubmissionModal;