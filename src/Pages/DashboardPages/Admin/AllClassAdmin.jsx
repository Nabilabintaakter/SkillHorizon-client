import { FaUser, FaEnvelope, FaInfoCircle } from "react-icons/fa"; // Import React Icons
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const AllClassAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
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
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Class</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Action</th>
                            <th>More Info</th>
                        </tr>
                    </thead>
                    <tbody>
    {classes.map((classItem, index) => (
        <tr 
            key={classItem._id} 
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100 hover:bg-gray-200"}
        >
            {/* Serial Number */}
            <th>{index + 1}</th>

            {/* Image */}
            <td>
                <div className="flex items-center gap-2">
                    <div className=" w-12 h-12">
                        <img src={classItem.image} alt={classItem.title} />
                    </div>
                    <p className="font-bold">{classItem.title}</p>
                </div>
            </td>

            {/* Email */}
            <td className="text-sm text-gray-600">{classItem.email}</td>

            {/* Description */}
            <td className="text-sm">
                {classItem.description.length > 50
                    ? `${classItem.description.slice(0, 50)}...`
                    : classItem.description}
            </td>

            {/* Actions */}
            <td>
                <div className="flex gap-2">
                    <button
                        className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                        onClick={() => handleApprove(classItem._id)}
                    >
                        Approve
                    </button>
                    <button
                        className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleReject(classItem._id)}
                    >
                        Reject
                    </button>
                </div>
            </td>

            {/* More Info */}
            <td>
                <button
                    className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => handleMoreInfo(classItem._id)}
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
