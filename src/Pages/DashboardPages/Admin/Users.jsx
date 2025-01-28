import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";

const Users = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`);
      return data;
    },
  });

  // Mutation to make a user an admin
  const { mutate: makeAdmin, isLoading: isMutating } = useMutation({
    mutationFn: async (userData) => {
      const response = await axiosSecure.patch(`/users/admin/${userData._id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User successfully made admin!");
      refetch();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to make user admin. Please try again.");
    },
  });

  const handleMakeAdmin = (userData) => {
    if (userData.role === "Admin") {
      toast.error("This user is already an admin.");
      return;
    }
    makeAdmin(userData);
  };

  useEffect(() => {
    document.title = `All Users | SkillHorizon`;
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Screen size state
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 640);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize); // Listen for screen size changes

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pagination logic
  const offset = currentPage * itemsPerPage;
  const currentUsers = users.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Calculate the range of items being displayed
  const startItem = currentPage * itemsPerPage + 1;
  const endItem = Math.min((currentPage + 1) * itemsPerPage, users.length);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-4 md:py-8 px-4 lg:px-5 xl:px-9">
      <div className="text-center mb-8">
        <h1 className="text-black mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto">
          User Management Panel
        </h1>
        <p className="text-[#0886A0] font-medium">
          View user details, manage roles, and grant admin privileges effortlessly.
        </p>
      </div>
      <div className="my-5 md:my-3">
        <p className="text-gray-600">
          A total of <span className="text-black text-xl">{users.length}</span> users are currently registered on your platform.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#009478] text-left">
              <th className="px-4 py-2 text-white hidden md:table-cell"></th>
              <th className="px-4 py-2 text-white">User</th>
              <th className="px-4 py-2 text-white">Name</th>
              <th className="px-4 py-2 text-white">Email</th>
              <th className="px-4 py-2 text-white">Role</th>
              <th className="px-4 py-2 text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((userData, index) => (
              <tr
                key={userData._id}
                className={`relative border-b ${
                  index % 2 === 0
                    ? "bg-[#95D3A2] bg-opacity-10"
                    : "bg-[#95D3A2] bg-opacity-20"
                } hover:bg-[#95D3A2] hover:bg-opacity-30`}
              >
                <td className="px-4 font-medium hidden md:table-cell">
                  {offset + index + 1}
                </td>
                <td className="absolute mt-6 md:mt-3 px-4">
                  <div className="w-10 h-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      src={userData.image}
                      alt={userData.title}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-6 text-gray-800 ">
                  <p className="font-semibold">{userData.name}</p>
                </td>
                <td className="px-4 text-gray-600 ">{userData.email}</td>
                <td className="px-4">
                  <button
                    className={`px-4 py-[2px] text-sm cursor-default rounded-2xl border-[1px] ${
                      userData.role === "Admin"
                        ? "bg-green-200 text-green-600 border-green-400"
                        : userData.role === "Teacher"
                        ? "bg-blue-200 text-blue-600 border-blue-400"
                        : "bg-yellow-200 text-yellow-600 border-yellow-400"
                    }`}
                  >
                    {userData.role}
                  </button>
                </td>

                <td className="mt-5 pr-5">
                  <button
                    className="btn btn-sm border-none px-4 py-[2px] rounded-md bg-green-500 hover:bg-green-600 text-white transition-all duration-300"
                    onClick={() => handleMakeAdmin(userData)}
                    disabled={isMutating || userData.role === "Admin"}
                  >
                    {isMutating ? "Processing..." : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination and Showing range */}
      <div className="mt-10 flex justify-between items-center">
        <p className="text-gray-800 text-sm md:text-base">
          Showing <span className="text-black text-sm md:text-xl">{startItem}</span>-
          <span className="text-black text-sm md:text-xl">{endItem}</span> of{" "}
          <span className="text-black text-sm md:text-xl">{users.length}</span> users
        </p>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={isSmallDevice ? 0 : 2}
          pageRangeDisplayed={isSmallDevice ? 2 : 5}
          onPageChange={handlePageChange}
          containerClassName={
            "pagination flex justify-center gap-3 items-center"
          }
          pageClassName={
            "bg-[#e3edf2] px-3 py-1 rounded-md shadow-sm hover:bg-[#f0f4f8]"
          }
          pageLinkClassName={
            "text-[#139196] font-medium hover:text-gray-800"
          }
          activeClassName={
            "bg-[#139196] text-white font-semibold shadow-md border-2 border-[#139196]"
          }
          previousClassName={
            "px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm md:text-base"
          }
          nextClassName={
            "px-3 py-1 bg-[#139196] text-white rounded-md shadow-sm hover:bg-[#e3edf2] hover:text-gray-800 text-sm md:text-base"
          }
          disabledClassName={"bg-gray-200 cursor-not-allowed hover:text-white"}
          breakClassName={"text-gray-800"}
        />
      </div>
    </div>
  );
};

export default Users;
