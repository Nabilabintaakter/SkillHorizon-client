import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const AllClassAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const { data: classes = [], isLoading, refetch, } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/classes`)
            return data
        },
    })
    console.log(classes)
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="container mx-auto py-8 px-4 lg:px-5 xl:px-9">
            <div className="text-center mb-8">
                <h1 className='text-black mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto'>Manage All Classes</h1>
                <p className='text-[#0886A0] font-medium'>Review, Approve, or Reject Classes and Track Progress</p>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-[#36A0AD] text-left">
                            <th className="px-4 py-2 text-white"></th>
                            <th className="px-4 py-2 text-white">Image</th>
                            <th className="px-4 py-2 text-white">Title</th>
                            <th className="px-4 py-2 text-white ">Added by</th>
                            <th className="px-4 py-2 text-white hidden md:table-cell">Description</th>
                            <th className="px-4 py-2 text-white">Action</th>
                            <th className="px-4 py-2 text-white">More Info</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {classes.map((classItem, index) => (
                            <tr
                                key={classItem._id}
                                className={`relative border-b ${index % 2 === 0 ? 'bg-[#95D3A2] bg-opacity-10' : 'bg-[#95D3A2] bg-opacity-20'} hover:bg-[#95D3A2] hover:bg-opacity-30`}
                            >
                                {/* Serial Number */}
                                <td className="px-4  font-bold">{index + 1}.</td>

                                {/* Class Image */}
                                <td className="absolute mt-3 px-4  flex items-center gap-2">
                                    <div className="w-12 h-12 ">
                                        <img src={classItem.image} alt={classItem.title} className="rounded-md object-cover w-full h-full " />
                                    </div>

                                </td>
                                {/* Email */}
                                <td className="px-4 py-6 text-gray-600 "><p className="font-semibold">{classItem.title}</p></td>
                                
                                {/* Email */}
                                <td className="px-4  text-sm text-gray-600 ">{classItem.email}</td>

                                {/* Description */}
                                <td className="px-4  text-sm hidden md:table-cell">
                                    {classItem.description.length > 50
                                        ? `${classItem.description.slice(0, 50)}...`
                                        : classItem.description}
                                </td>

                                {/* Actions */}
                                <td className="mt-3 flex flex-col md:flex-row items-center gap-1">
                                    <button
                                        className="btn btn-sm md:btn-md bg-green-500 text-white hover:bg-white hover:text-green-500 transition-all duration-300"
                                        onClick={() => handleApprove(classItem._id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn btn-sm md:btn-md bg-red-500 hover:bg-white text-white hover:text-red-500 transition-all duration-300"
                                        onClick={() => handleReject(classItem._id)}
                                    >
                                        Reject
                                    </button>
                                </td>

                                {/* More Info */}
                                <td className="px-4">
                                    <button
                                        className="btn btn-md  bg-yellow-500 hover:bg-white text-white hover:text-yellow-500 transition-all duration-300"
                                    >
                                        View Progress
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

export default AllClassAdmin;
