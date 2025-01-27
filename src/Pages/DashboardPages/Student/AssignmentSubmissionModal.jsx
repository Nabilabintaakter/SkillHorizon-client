import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";

const AssignmentSubmissionModal = ({ isOpen, close, assignment, thisAssignmentSubmission }) => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    // UseMutation for submission
    const { isLoading: isSubmitting, mutateAsync } = useMutation({
        mutationFn: async (submissionInfo) => {
            const response = await axiosSecure.post(`/assignments-submission`, submissionInfo);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Assignment submitted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Something went wrong!");
        },
    });

    const onSubmit = async (data) => {
        const submissionInfo = {
            classId: assignment?.classId,
            className: assignment?.className,
            assignmentTitle: assignment?.title,
            submittedUrl: data.submittedUrl,
            teacherEmail: assignment?.teacherEmail,
            studentEmail: user?.email,
            submittedDate: moment().utc().format(),
        };

        try {
            await mutateAsync(submissionInfo);
            reset();
            close();
            refetch();
        } catch (error) {
            console.error("Submission failed:", error.message);
        }
    };

    // Fetch previous submission (if exists)
    const { data: mySubmission = {}, refetch, isFetching } = useQuery({
        queryKey: ["submission", assignment?.title, user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(
                `/my-submission?title=${assignment?.title}&email=${user?.email}`
            );
            return data;
        },
        enabled: !!assignment?.title && !!user?.email, // Fetch only when data is available
    });

    // Update the parent state with mySubmission
    useEffect(() => {
        if (thisAssignmentSubmission) {
            thisAssignmentSubmission(mySubmission);
        }
    }, [mySubmission, thisAssignmentSubmission]);

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
                            <Dialog.Panel className="w-full max-w-lg bg-gray-50 rounded-lg shadow-lg p-6">
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
                                            {...register("submittedUrl", { required: "Assignment link is required" })}
                                            placeholder="Enter assignment link"
                                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 placeholder-gray-400"
                                        />
                                        {errors.submittedUrl && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.submittedUrl.message}
                                            </p>
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
                                            disabled={isSubmitting}
                                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    Submitting...
                                                    <ImSpinner9 className="animate-spin m-auto text-sm" />
                                                </span>
                                            ) : (
                                                "Submit"
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
