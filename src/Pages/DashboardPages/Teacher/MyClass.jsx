import { FaUser, FaEnvelope, FaInfoCircle, FaThList } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ReactPaginate from 'react-paginate';
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { Button } from '@headlessui/react'
import { useEffect, useState } from 'react'
import UpdateClassModal from "../../../components/Modal/UpdateClassModal";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";

const MyClass = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    let [isOpen, setIsOpen] = useState(false)
    let [selectedClass, setSelectedClass] = useState(null)

    function open(classItem) {
        setSelectedClass(classItem)
        setIsOpen(true)
    }
    function close() {
        setIsOpen(false)
        document.title = 'My Classes | SkillHorizon';
    }


    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/classes/${user?.email}`)
            return data
        },
    })
    useEffect(() => {
        document.title = `My Classes | SkillHorizon`;
    }, [])
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    // Pagination logic
    const offset = currentPage * itemsPerPage;
    const currentClasses = classes.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(classes.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Calculate the range of items being displayed
    const startItem = currentPage * itemsPerPage + 1;
    const endItem = Math.min((currentPage + 1) * itemsPerPage, classes.length);
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    // DELETE
    const handleDeleteClass = (id) => {
        Swal.fire({
            title: 'Are you sure to delete the class?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/my-class/${id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            Swal.fire('Deleted!', 'Your class has been deleted.', 'success');
                        }
                        refetch();
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
                    });
            }
        });
    };
    return (
        <div className="bg-white dark:bg-[#282834] container mx-auto py-4 md:py-8 px-4 lg:px-5 xl:px-9 pb-10">
            <Zoom tr>
                <div className="text-center mb-8">
                    <h1 className='text-black dark:text-white mb-3 text-2xl md:text-3xl lg:text-4xl font-bold w-full mx-auto'>Manage Your Classes</h1>
                    <p className='text-[#0886A0]  font-medium'>View, Update, and Delete Your Added Classes Seamlessly</p>
                </div>  </Zoom><div className='my-5'>
                    <p className='text-gray-600 dark:text-gray-200'>
                        You've added <span className='text-black dark:text-white text-xl'>{classes.length}</span> classes. You can now update, delete, or view the details of approved classes.
                    </p>
                </div>
          

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {
                    classes?.length > 0 ?
                        currentClasses.map((classItem, index) => (
                            <div key={index} className="relative bg-white drop-shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">

                                {/* Status Badge */}
                                <span
                                    className={`absolute top-2 right-2 px-3 py-1 text-sm font-medium rounded-full ${classItem.status === "Accepted"
                                        ? "bg-green-100 text-green-600"
                                        : classItem.status === "Rejected"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-yellow-100 text-yellow-600"
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
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {classItem.title}
                                        </h3>
                                        <p className="text-2xl font-bold text-[#139196]">
                                            ${classItem.price}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-500 flex items-start gap-2 mb-2">
                                        <FaInfoCircle className="text-base text-[#fac927] flex-shrink-0 w-4 h-4 mt-[2.5px]" />
                                        <span className="leading-tight">{classItem.description}</span>
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
                                        <Button onClick={() => open(classItem)} className="btn btn-sm border-none py-1 bg-[#4CAF50] text-white rounded-md hover:bg-[#388E3C] transition flex-grow">
                                            Update
                                        </Button>

                                        {/* UPDATE MODAL */}
                                        <UpdateClassModal
                                            isOpen={isOpen}
                                            close={close}
                                            classItem={selectedClass}
                                            refetch={refetch}
                                        />

                                        <button
                                            onClick={() => handleDeleteClass(classItem._id)}
                                            className="bg-[#F44336] py-1 text-white btn btn-sm border-none rounded-md hover:bg-[#D32F2F] transition flex-grow"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <Zoom triggerOnce>
                                        <Link to={`/dashboard/my-class/${classItem._id}/${classItem.email}`} disabled={classItem.status === "Pending" || classItem.status === "Rejected"} className="bg-[#2196F3] text-white btn btn-sm border-none py-1 w-full rounded-md hover:bg-[#1976D2] transition">
                                            See Details
                                        </Link>
                                    </Zoom>
                                </div>
                            </div>
                        )) :
                        (
                            <div className="col-span-full text-center py-16 flex flex-col items-center bg-[#fef2f2] dark:bg-[#282834] rounded-lg shadow-md">
                                <FaThList className="text-6xl text-[#D32F2F] mb-6" />
                                <p className="text-red-600 text-2xl font-semibold mb-3 dark:text-white">
                                    No Classes Available!
                                </p>
                                <p className="text-gray-500 dark:text-gray-200 text-md mb-6 xl:w-[40%] mx-auto px-5">
                                    It seems you haven't added any classes yet. Start adding your classes to manage them here.
                                </p>
                            </div>
                        )
                }
            </div>
            {/* Pagination and Showing range */}
            {classes?.length > 0 && <div className="mt-10 flex flex-col md:flex-row gap-5 md:justify-between items-center">
                <p className="text-gray-800 dark:text-gray-200">
                    Showing <span className="text-black dark:text-white text-xl">{startItem}</span>-<span className="text-black dark:text-white text-xl">{endItem}</span> of <span className="text-black dark:text-white text-xl">{classes.length}</span> classes
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
            </div>}
        </div>
    )
}
export default MyClass;
