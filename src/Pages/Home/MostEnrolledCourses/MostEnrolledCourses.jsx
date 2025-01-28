import React from 'react';
import Container from '../../../Shared/Container/Container';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaEnvelope, FaUserCircle } from 'react-icons/fa';

const MostEnrolledCourses = () => {
    const axiosPublic = useAxiosPublic();
    // Total users
    const { data: featuredClasses = [] } = useQuery({
        queryKey: ['featuredClasses'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/featuredClasses`)
            return data
        },
    })
    console.log(featuredClasses);
    return (
        <div className=" py-10 md:pb-16 bg-[#F1EFEE]">
            <Container>
                {/* header */}
                <div className="flex items-center justify-between">
                    <div className="text-left mb-8 md:mb-12 w-full">
                        <p className="text-[#0886A0] mb-3 font-medium">Featured Courses</p>
                        <h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]">Find Yours From The Featured</h1>
                    </div>
                    <div className='w-[150px]'>
                        <Link
                            to="/allClasses"
                            className="text-white rounded-[5px] bg-gradient-to-br from-[#66BE80] to-[#139196] font-medium hover:from-[#139196] hover:to-[#139196] cursor-pointer px-5 md:px-6 py-2 md:py-3 flex justify-center items-center duration-1000 ease-in-out transition-all"
                            style={{ alignSelf: 'flex-start' }}
                        >
                            View All
                        </Link>
                    </div>
                </div>
                {/* classes here */}
                <>
                    <Swiper
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 25,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper relative swiper-container"
                    >
                        {featuredClasses.map((classItem, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative bg-[#F1EFEE] rounded-md overflow-hidden flex flex-col justify-between group hover:bg-gradient-to-br hover:from-[#66BE80] hover:to-[#139196] transition duration-500 ease-out h-[335px] md:h-[330px]">
                                    {/* Image */}
                                    <img
                                        src={classItem.image}
                                        alt={classItem.title}
                                        className="w-full h-52 md:h-44 object-cover rounded-md group-hover:opacity-0 transition duration-300"
                                    />

                                    {/* Content */}
                                    <div className="py-3 mt-2 group-hover:p-5 flex-grow">
                                        {/* Title & Description */}
                                        <div className="group-hover:text-white transition duration-300 group-hover:absolute md:group-hover:top-20 group-hover:top-24">
                                            <h3 className="group-hover:leading-loose md:group-hover:leading-tight group-hover:pr-5 text-lg font-medium group-hover:font-bold text-black group-hover:text-white">
                                                {classItem.title}
                                            </h3>
                                        </div>

                                        <p className="text-gray-100 text-sm font-semibold group-hover:font-normal group-hover:opacity-100 opacity-0 group-hover:block absolute group-hover:top-32 md:group-hover:top-32 group-hover:w-auto group-hover:leading-loose md:group-hover:leading-tight lg:group-hover:leading-loose group-hover:pr-5">
                                            {classItem.description}
                                        </p>

                                        {/* teacher, price */}
                                        <div className="group-hover:hidden mt-3">
                                            <div className="text-gray-700 flex items-center gap-3">
                                                <FaUserCircle className="text-2xl text-[#229df0]" />
                                                <p>By </p>
                                                <span className="text-black">{classItem.name}</span>
                                            </div>
                                            <div className="mt-3 text-2xl font-bold text-[#139196]">
                                                <small className="text-gray-400 font-normal line-through mr-2 text-base">$1000</small>
                                                ${classItem.price}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enrollments */}
                                    <span
                                        className={`absolute top-3 right-3 px-3 py-1 text-sm backdrop-blur-md text-green-500 bg-white/80 rounded-lg border-[1px] border-green-500 group-hover:hidden`}
                                    >
                                        {classItem.totalEnrollment > 0
                                            ? `${classItem.totalEnrollment} Enrollments`
                                            : "Be the first to enroll !"}
                                    </span>

                                    {/* Enroll Now Button */}
                                    <Link
                                        to={`/class/${classItem._id}`}
                                        className="p-5 flex items-center gap-1 group-hover:opacity-100 opacity-0 transition duration-500 group-hover:block absolute bottom-3 text-lg"
                                    >
                                        <button
                                            disabled={
                                                classItem.status === "Pending" || classItem.status === "Rejected"
                                            }
                                            className="bg-[#F0BF79] text-black hover:bg-[#139196] hover:text-white cursor-pointer btn btn-md border-none rounded-md transition text-base"
                                        >
                                            <FaEnvelope className="mb-[2px] text-base" /> Enroll Now !
                                        </button>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </>

            </Container>
        </div>
    );
};

export default MostEnrolledCourses;
