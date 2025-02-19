import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";

const AllClassAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ["allClasses"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/classes`);
            return data;
        },
    });

    const { mutate: makeApproveClass } = useMutation({
        mutationFn: async (classData) => {
            const response = await axiosSecure.patch(`/admin/approve-class/${classData._id}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Successfully approved class!");
            refetch();
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to approve class. Please try again.");
        },
    });

    const { mutate: makeRejectClass } = useMutation({
        mutationFn: async (classData) => {
            const response = await axiosSecure.patch(`/admin/reject-class/${classData._id}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Successfully rejected class!");
            refetch();
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to reject class. Please try again.");
        },
    });

    const handleClassApprove = (classData) => {
        if (classData.status === "Accepted") {
            toast.error("This class is already approved.");
            return;
        }
        makeApproveClass(classData);
    };

    const handleClassReject = (classData) => {
        if (classData.status === "Rejected") {
            toast.error("This class is already rejected.");
            return;
        }
        makeRejectClass(classData);
    };

    useEffect(() => {
        document.title = `All Class Requests | SkillHorizon`;
    }, []);

    const [currentPage, setCurrentPage] = useState(0);
    const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768); // Check device width
    const itemsPerPage = 10;

    useEffect(() => {
        const handleResize = () => setIsSmallDevice(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const offset = currentPage * itemsPerPage;
    const currentClasses = classes.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(classes.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min((currentPage + 1) * itemsPerPage, classes.length);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="bg-white dark:bg-[#282834] container mx-auto py-4 md:py-8 px-4 lg:px-5 xl:px-9">
            <Zoom triggerOnce>
                <div className="text-center mb-8">
                    <h1 className="text-black dark:text-white mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto">Manage All Classes</h1>
                    <p className="text-[#0886A0] font-medium">Review, Approve, or Reject Classes and Track Progress</p>
                </div>
            </Zoom>
            <div className="my-5 md:my-3">
                <p className="text-gray-600 dark:text-gray-200">
                    A total of <span className="text-black dark:text-white text-xl">{classes.length}</span> class requests have been submitted by teachers for your review.
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-[#009478] text-left">
                            <th className="px-4 py-2 text-white"></th>
                            <th className="px-4 py-2 text-white">Image</th>
                            <th className="px-4 py-2 text-white">Title</th>
                            <th className="px-4 py-2 text-white">Added by</th>
                            <th className="px-4 py-2 text-white hidden md:table-cell">Description</th>
                            <th className="px-4 py-2 text-white">Action</th>
                            <th className="px-4 py-2 text-white">More Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClasses.map((classItem, index) => (
                            <tr key={classItem._id} className={`relative border-b ${index % 2 === 0 ? "bg-[#95D3A2] bg-opacity-10" : "bg-[#95D3A2] bg-opacity-20"} hover:bg-[#95D3A2] hover:bg-opacity-30`}>
                                <td className="px-4 font-medium">{offset + index + 1}</td>
                                <td className="absolute mt-3 px-4 flex items-center gap-2">
                                    <div className="w-12 h-12">
                                        <img src={classItem.image} alt={classItem.title} className="rounded-md object-cover w-full h-full" />
                                    </div>
                                </td>
                                <td className="px-4 py-6 text-sm text-gray-800">
                                    <p className="font-semibold">{classItem.title}</p>
                                </td>
                                <td className="px-4 text-sm text-gray-600">{classItem.email}</td>
                                <td className="px-4 text-sm hidden md:table-cell text-gray-600">
                                    {classItem.description.length > 50 ? `${classItem.description.slice(0, 25)}...` : classItem.description}
                                </td>
                                <td className="mt-4 flex flex-col md:flex-row items-center gap-1">
                                    <button className="text-sm border-none px-4 py-[6px] rounded-md bg-green-500 text-white hover:bg-white hover:text-green-500 transition-all duration-500" onClick={() => handleClassApprove(classItem)}>
                                        Approve
                                    </button>
                                    <button className="border-none px-4 py-[6px] rounded-md bg-red-500 hover:bg-white text-sm text-white hover:text-red-500 transition-all duration-500" onClick={() => handleClassReject(classItem)}>
                                        Reject
                                    </button>
                                </td>
                                <td className="px-4">
                                    <Link
                                        to={`/dashboard/my-class/${classItem._id}/${classItem.email}`}
                                        className="border-none btn btn-sm rounded-md bg-yellow-500 hover:bg-white text-xs text-white hover:text-yellow-500 transition-all duration-500"
                                        disabled={classItem.status === "Pending" || classItem.status === "Rejected"}
                                    >
                                        Progress
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-10 flex flex-col md:flex-row gap-5 md:justify-between items-center">
                <p className="text-gray-800 dark:text-gray-200 text-sm md:text-base">
                    Showing <span className="text-black dark:text-white text-sm md:text-xl">{startItem}</span>-<span className="text-black dark:text-white text-sm md:text-xl">{endItem}</span> of <span className="text-black dark:text-white text-sm md:text-xl">{classes.length}</span> classes
                </p>
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={isSmallDevice ? 0 : 2}
                    pageRangeDisplayed={isSmallDevice ? 2 : 5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination flex justify-center gap-3 items-center"}
                    pageClassName={"bg-[#e3edf2] px-3 py-1 rounded-md shadow-sm hover:bg-[#f0f4f8]"}
                    pageLinkClassName={"text-[#139196] font-medium hover:text-gray-800"}
                    activeClassName={"bg-[#139196] text-white font-semibold shadow-md border-2 border-[#139196]"}
                    previousClassName={"px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm md:text-base"}
                    nextClassName={"px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm md:text-base"}
                    disabledClassName={"bg-gray-200 cursor-not-allowed hover:text-white"}
                    breakClassName={"text-gray-800"}
                />
            </div>
        </div>
    );
};

export default AllClassAdmin;
