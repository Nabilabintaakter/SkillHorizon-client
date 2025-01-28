import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdEmail } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";
import { FaClipboard, FaRegClock } from "react-icons/fa";

const AssignmentSubmissions = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    // Fetch submission data
    const { data: submissionData = [] } = useQuery({
        queryKey: ["submissions", id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-class-assignment/submissions/${id}`);
            return data;
        },
    });
    const formatDate = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleString();
    };
    useEffect(() => {
        document.title = `Assignment Submissions | SkillHorizon`;
    }, [])
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Pagination logic
    const offset = currentPage * itemsPerPage;
    const currentSubmissionData = submissionData.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(submissionData.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Calculate the range of items being displayed
    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min((currentPage + 1) * itemsPerPage, submissionData.length);
    return (
        <div className="container mx-auto py-6 md:py-10 px-4 lg:px-6 xl:px-10">
            {/* Heading */}
            <div className="text-center mb-10">
                <h1 className="text-gray-800 text-2xl md:text-3xl lg:text-4xl font-bold w-[70%] mx-auto">
                    Assignment Submissions
                </h1>
                {submissionData?.length > 0 && <p className="text-gray-800 text-xl md:text-2xl mt-3 font-medium w-[70%] mx-auto">{submissionData[0]?.className || "Class"}</p>}
                <p className="text-[#0886A0] font-medium mt-2">
                    Total Submissions: {submissionData?.length} | Track assignment submissions in detail
                </p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
                {submissionData.length > 0 ? (
                    currentSubmissionData.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xl text-purple-600 font-bold">{offset + index + 1}.</span>
                                    <span className="text-purple-600 text-xl flex items-center font-medium">{item.assignmentTitle}</span>
                                </div>
                            </div>

                            <p className="text-sm font-medium text-gray-700 mb-2">
                                <MdEmail className="inline-block text-[#FF7B54] mr-1" />
                                Submitted by:{" "}
                                <span className="font-normal text-gray-600">{item.studentEmail}</span>
                            </p>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                <BsLink45Deg className="inline-block text-green-600 mr-1" />
                                Submission URL:{" "}
                                <a
                                    href={item.submittedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    View Submission
                                </a>
                            </p>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                <FaRegClock className="inline-block text-[#FF7B54] mr-1" />
                                Submitted date:{" "}
                                <span className="font-normal text-gray-600">{formatDate(item.submittedDate)}</span>
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="col-span-2 text-center w-[70%] lg:w-[40%] mx-auto text-red-600 text-lg flex flex-col items-center gap-3">
                        <FaClipboard className="text-4xl text-red-400 " />
                        <span>No submissions have been made for this assignment yet.</span>
                    </p>
                )}
            {/* Pagination and Showing range */}
            <div className="mt-10 flex justify-between items-center col-span-2">
                <p className="text-gray-800">
                    Showing <span className="text-black text-xl">{startItem}</span>-<span className="text-black text-xl">{endItem}</span> of <span className="text-black text-xl">{submissionData.length}</span> submissions
                </p>
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
                    activeClassName={'bg-[#139196] text-white font-semibold shadow-md border-2 border-[#139196]'} // Active page color changes
                    previousClassName={'px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm md:text-base'}
                    nextClassName={'px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm md:text-base'}
                    disabledClassName={'bg-gray-200 cursor-not-allowed hover:text-white'}
                    breakClassName={'text-gray-800'}
                    style={{ height: '40px' }}
                />
            </div>
            </div>
        </div>
    );
};

export default AssignmentSubmissions;
