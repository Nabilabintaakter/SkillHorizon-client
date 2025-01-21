import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure()
    const { data: teachers = [], isLoading, refetch, } = useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/teachers`)
            return data
        },
    })
    console.log(teachers)
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="container mx-auto py-8 px-4 lg:px-5 xl:px-9">
            <div className="text-center mb-8">
                <h1 className='text-black mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto'>
                    Manage Teacher Requests
                </h1>
                <p className='text-[#0886A0] font-medium'>
                    Review and Approve Teacher Applications Seamlessly
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-[#36A0AD] text-left">
                            <th className="px-4 py-2 text-white hidden md:table-cell"></th>
                            <th className="px-4 py-2 text-white">Image</th>
                            <th className="px-4 py-2 text-white">Name</th>
                            <th className="px-4 py-2 text-white ">Experience</th>
                            <th className="px-4 py-2 text-white ">Title</th>
                            <th className="px-4 py-2 text-white">Action</th>
                            <th className="px-4 py-2 text-white">Status</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr
                                key={teacher._id}
                                className={`relative border-b ${index % 2 === 0 ? 'bg-[#95D3A2] bg-opacity-10' : 'bg-[#95D3A2] bg-opacity-20'} hover:bg-[#95D3A2] hover:bg-opacity-30`}
                            >
                                {/* Serial Number */}
                                <td className="px-4  font-medium hidden md:table-cell">{index + 1}.</td>

                                {/* Image */}
                                <td className="absolute mt-3 px-4  flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full">
                                        <img src={teacher.image} alt={teacher.title} className="rounded-full object-cover w-full h-full " />
                                    </div>
                                </td>
                                {/* Name */}
                                <td className="px-4 py-6 text-sm text-gray-800 "><p className="font-semibold">{teacher.name}</p></td>

                                {/* Experience */}
                                <td className="px-4 text-sm text-gray-600 ">{teacher.experience}</td>

                                {/* Title */}
                                <td className="px-4 text-sm  text-gray-600">
                                    {teacher.title}
                                </td>
                                {/* Actions */}
                                <td className="mt-5 flex flex-col md:flex-row items-center gap-1">
                                    <button
                                        className="border-none text-sm px-4 py-[2px] rounded-md bg-green-500 text-white hover:bg-white hover:text-green-500 transition-all duration-500"
                                        onClick={() => handleApprove(teacher._id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="border-none text-sm px-4 py-[2px] rounded-md bg-red-500 hover:bg-white text-white hover:text-red-500 transition-all duration-500"
                                        onClick={() => handleReject(teacher._id)}
                                    >
                                        Reject
                                    </button>
                                </td>

                                {/* Status */}
                                <td className="px-4">
                                    <button
                                        className=" px-4 py-[2px] text-sm cursor-default rounded-2xl  bg-yellow-200  text-yellow-600 border-[1px] border-yellow-400"
                                    >
                                        {teacher.status}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherRequest;
