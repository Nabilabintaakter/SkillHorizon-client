import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], isLoading, refetch, } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users`)
            return data
        },
    })
    console.log(users)
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="container mx-auto py-8 px-4 lg:px-5 xl:px-9">
            <div className="text-center mb-8">
                <h1 className='text-black mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto'>
                    User Management Panel
                </h1>
                <p className='text-[#0886A0] font-medium'>
                    View user details, manage roles, and grant admin privileges effortlessly.
                </p>

            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-[#36A0AD] text-left">
                            <th className="px-4 py-2 text-white hidden md:table-cell"></th>
                            <th className="px-4 py-2 text-white">User</th>
                            <th className="px-4 py-2 text-white">Name</th>
                            <th className="px-4 py-2 text-white ">Email</th>
                            <th className="px-4 py-2 text-white ">Role</th>
                            <th className="px-4 py-2 text-white">Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {users.map((userData, index) => (
                            <tr
                                key={userData._id}
                                className={`relative border-b ${index % 2 === 0 ? 'bg-[#95D3A2] bg-opacity-10' : 'bg-[#95D3A2] bg-opacity-20'} hover:bg-[#95D3A2] hover:bg-opacity-30`}
                            >
                                {/* Serial Number */}
                                <td className="px-4  font-medium hidden md:table-cell">{index + 1}.</td>

                                {/* Image */}
                                <td className="absolute mt-6 md:mt-3 px-4">
                                    <div className="w-10 h-10 rounded-full">
                                        <img referrerPolicy="no-referrer" src={userData.image} alt={userData.title} className="rounded-full object-cover w-full h-full " />
                                    </div>
                                </td>
                                {/* Name */}
                                <td className="px-4 py-6  text-gray-800 "><p className="font-semibold">{userData.name}</p></td>

                                {/* Email */}
                                <td className="px-4  text-gray-600 ">{userData.email}</td>
                                {/* Role */}
                                <td className="px-4">
                                    <button
                                        className=" px-4 py-[2px] text-sm cursor-default rounded-2xl  bg-yellow-200  text-yellow-600 border-[1px] border-yellow-400"
                                    >
                                        {userData.role}
                                    </button>
                                </td>
                                {/* Action */}
                                <td className="mt-5 pr-5">
                                    <button
                                        className="border-none  px-4 py-[2px] rounded-md bg-green-500 text-white hover:bg-white hover:text-green-500 transition-all duration-500"
                                        onClick={() => handleApprove(userData._id)}
                                    >
                                        Make Admin
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

export default Users;
