import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { Zoom } from "react-awesome-reveal";

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: teachers = [], isLoading, refetch } = useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/teachers`);
            return data;
        },
    });

    const { mutate: makeTeacher, isLoading: isMutating } = useMutation({
        mutationFn: async (teacherData) => {
            const response = await axiosSecure.patch(`/teachers/teacher-approve/${teacherData.email}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("User successfully made teacher!");
            refetch();
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to make user teacher. Please try again.");
        },
    });

    const { mutate: rejectTeacher } = useMutation({
        mutationFn: async (teacherData) => {
            const response = await axiosSecure.patch(`/teachers/teacher-reject/${teacherData.email}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("User is rejected to be an instructor!");
            refetch();
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed. Please try again.");
        },
    });

    const handleApprove = (teacherData) => {
        if (teacherData.status === "Accepted") {
            toast.error("This user is already a teacher.");
            return;
        }
        makeTeacher(teacherData);
    };

    const handleReject = (teacherData) => {
        if (teacherData.status === "Rejected") {
            toast.error("This user is already a student.");
            return;
        }
        rejectTeacher(teacherData);
    };

    useEffect(() => {
        document.title = `Teacher Requests | SkillHorizon`;
    }, []);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const offset = currentPage * itemsPerPage;
    const currentTeachers = teachers.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(teachers.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min((currentPage + 1) * itemsPerPage, teachers.length);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="bg-white dark:bg-[#282834] container mx-auto py-4 md:py-8 px-4 lg:px-5 xl:px-9">
            <Zoom triggerOnce>
                <div className="text-center mb-8">
                    <h1 className="text-black dark:text-white mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto">
                        Manage Teacher Requests
                    </h1>
                    <p className="text-[#0886A0] font-medium">
                        Review and Approve Teacher Applications Seamlessly
                    </p>
                </div>
            </Zoom>
            <div className="my-5 md:my-3">
                <p className="text-gray-600 dark:text-gray-200">
                    A total of <span className="text-black dark:text-white text-xl">{teachers.length}</span> users have requested to become teachers on your platform.
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-[#009478] text-left">
                            <th className="px-4 py-2 text-white hidden md:table-cell"></th>
                            <th className="px-4 py-2 text-white">Image</th>
                            <th className="px-4 py-2 text-white">Name</th>
                            <th className="px-4 py-2 text-white">Experience</th>
                            <th className="px-4 py-2 text-white">Title</th>
                            <th className="px-4 py-2 text-white">Action</th>
                            <th className="px-4 py-2 text-white">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTeachers.map((teacher, index) => (
                            <tr
                                key={teacher._id}
                                className={`relative border-b ${index % 2 === 0 ? 'bg-[#95D3A2] bg-opacity-10' : 'bg-[#95D3A2] bg-opacity-20'} hover:bg-[#95D3A2] hover:bg-opacity-30`}
                            >
                                <td className="px-4 font-medium hidden md:table-cell">{index + 1}</td>
                                <td className="absolute mt-3 px-4 flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full">
                                        <img src={teacher.image} alt={teacher.title} className="rounded-full object-cover w-full h-full" />
                                    </div>
                                </td>
                                <td className="px-4 py-6 text-sm text-gray-800">
                                    <p className="font-semibold">{teacher.name}</p>
                                </td>
                                <td className="px-4 text-sm text-gray-600">{teacher.experience}</td>
                                <td className="px-4 text-sm text-gray-600">{teacher.title}</td>
                                <td className="mt-5 flex flex-col md:flex-row items-center gap-1">
                                    <button
                                        className="border-none btn btn-sm text-sm rounded-md bg-green-500 text-white hover:bg-white hover:text-green-500 transition-all duration-500"
                                        onClick={() => handleApprove(teacher)}
                                        disabled={teacher.status === "Rejected"}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="border-none btn btn-sm text-sm rounded-md bg-red-500 hover:bg-white text-white hover:text-red-500 transition-all duration-500"
                                        onClick={() => handleReject(teacher)}
                                        disabled={teacher.status === "Rejected"}
                                    >
                                        Reject
                                    </button>
                                </td>
                                <td className="px-4">
                                    <button
                                        className={`px-4 py-[2px] text-sm cursor-default rounded-2xl border-[1px] ${teacher.status === "Accepted"
                                            ? "bg-green-200 text-green-600 border-green-400"
                                            : teacher.status === "Rejected"
                                                ? "bg-red-200 text-red-600 border-red-400"
                                                : "bg-yellow-200 text-yellow-600 border-yellow-400"
                                            }`}
                                    >
                                        {teacher.status}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="mt-10 flex flex-col md:flex-row gap-5 md:justify-between items-center">
                <p className="text-gray-800 dark:text-gray-200 text-sm md:text-base">
                    Showing <span className="text-black dark:text-white text-sm md:text-xl">{startItem}</span>-<span className="text-black  dark:text-white text-sm md:text-xl">{endItem}</span> of <span className="text-black dark:text-white text-sm md:text-xl">{teachers.length}</span> teachers
                </p>
                {/* Full pagination for larger screens */}
                <div className="hidden sm:flex">
                    <ReactPaginate
                        previousLabel={'← Previous'}
                        nextLabel={'Next →'}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination flex justify-center gap-3 items-center'}
                        pageClassName={'bg-[#e3edf2] px-3 py-1 rounded-md shadow-sm hover:bg-[#f0f4f8]'}
                        pageLinkClassName={'text-[#139196] font-medium hover:text-gray-800'}
                        activeClassName={'bg-[#139196] text-white font-semibold shadow-md border-2 border-[#139196]'}
                        previousClassName={'px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm md:text-base'}
                        nextClassName={'px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm md:text-base'}
                        disabledClassName={'bg-gray-200 cursor-not-allowed hover:text-white'}
                        breakClassName={'text-gray-800'}
                    />
                </div>
                {/* Simplified pagination for small screens */}
                <div className="flex sm:hidden">
                    <ReactPaginate
                        previousLabel={'←'}
                        nextLabel={'→'}
                        pageCount={pageCount}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination flex justify-center gap-2 items-center'}
                        pageClassName={'bg-[#e3edf2] px-2 py-1 rounded-md shadow-sm hover:bg-[#f0f4f8]'}
                        pageLinkClassName={'text-[#139196] font-medium hover:text-gray-800'}
                        activeClassName={'bg-[#139196] text-white font-semibold shadow-md border-2 border-[#139196]'}
                        previousClassName={'px-2 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm'}
                        nextClassName={'px-2 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm'}
                        disabledClassName={'bg-gray-200 cursor-not-allowed hover:text-white'}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeacherRequest;
