import { FaUser, FaEnvelope, FaInfoCircle } from "react-icons/fa"; // Import React Icons
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const MyClass = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth();
    const {data: classes = [],isLoading,refetch,} = useQuery({
      queryKey: ['classes'],
      queryFn: async () => {
        const { data } = await axiosSecure(`/classes/${user?.email}`)
        return data
      },
    })
    console.log(classes)
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="container mx-auto py-8 px-4 lg:px-5 xl:px-9">
            <div className="text-center mb-8">
                <h1 className='text-black mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto'>Manage Your Classes</h1>
                <p className='text-[#0886A0]  font-medium'>View, Update, and Delete Your Added Classes Seamlessly</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {classes.map((classItem, index) => (


                    <div key={index} className="relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
                        {/* Status Badge */}
                        <span
                            className={`absolute top-2 right-2 px-3 py-1 text-sm font-semibold rounded-lg ${classItem.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"
                                }`}
                        >
                            {classItem.status}
                        </span>

                        {/* Image */}
                        <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="w-full h-52 md:h-32 object-cover"
                        />

                        {/* Content */}
                        <div className="p-3 flex-grow">
                            {/* Title & Price */}
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                                    {classItem.title}
                                </h3>
                                <p className="text-2xl font-semibold text-green-500">
                                    ${classItem.price}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-gray-500 flex items-start gap-2 mb-2">
                                <FaInfoCircle className="text-base text-[#fac927] flex-shrink-0 w-4 h-4 mt-[2.5px]" />
                                <span className="break-words">{classItem.description}</span>
                            </p>

                            {/* Name */}
                            <p className="text-gray-600 flex items-center gap-2 mb-1">
                                <FaUser className="text-base text-[#229df0] w-4 h-4" />
                                {classItem.name}
                            </p>

                            {/* Email */}
                            <p className="text-gray-600 flex items-center gap-2 mb-1">
                                <FaEnvelope className="text-base text-[#d85420] w-4 h-4" />
                                {classItem.email}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="px-3 pb-3">
                            <div className="flex gap-2 mb-2">
                                <button className="btn btn-sm border-none py-1 bg-[#4CAF50] text-white rounded-md hover:bg-[#388E3C] transition flex-grow">
                                    Update
                                </button>
                                <button className="bg-[#F44336] py-1 text-white btn btn-sm border-none rounded-md hover:bg-[#D32F2F] transition flex-grow">
                                    Delete
                                </button>
                            </div>
                            <button className="bg-[#2196F3] text-white btn btn-sm border-none py-1 w-full rounded-md hover:bg-[#1976D2] transition">
                                See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClass;
