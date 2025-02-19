import React from "react";
import relevantImage from "../../../assets/Devices-amico.png"; // Replace with your relevant image path
import Container from "../../../Shared/Container/Container";
import Heading from "../../../Shared/Heading/Heading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Fade, Slide } from "react-awesome-reveal"; // Import animation components

const StatsSection = () => {
    const axiosPublic = useAxiosPublic();
    // Total users
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/users`);
            return data;
        },
    });
    // Total classes
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/all-classes`);
            return data;
        },
    });
    // Total enrollments
    const { data: enrollments = [] } = useQuery({
        queryKey: ['enrollments'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/enrollments`);
            return data;
        },
    });

    return (
        <div className="bg-white dark:bg-[#282834] py-12 md:py-16">
            <Container>
                <Heading subtitle="Our Impact in Numbers" title="Celebrating milestones of growth and success" />
                <div className="flex justify-center items-center">
                    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:gap-10 lg:gap-28">
                        {/* Left Section */}
                        <div className="mt-6 sm:mt-0 flex flex-col gap-4">
                            {/* Card for Total Users */}
                            <Slide direction="up" triggerOnce delay={0.1}>
                                <div className="bg-white p-3 md:p-5 rounded-lg border border-gray-300 hover:shadow-2xl transition duration-300 hover:border-[#139196] hover:-translate-y-1">
                                    <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 md:mb-2">
                                        Total Users
                                    </h3>
                                    <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#139196]">
                                        {users?.length}
                                        <span className="ml-2 text-gray-500 text-base md:mt-2">Users actively using the platform</span>
                                    </p>
                                </div>
                            </Slide>

                            {/* Card for Total Classes */}
                            <Slide direction="up" triggerOnce delay={0.2}>
                                <div className="bg-white p-3 md:p-5 rounded-lg border border-gray-300 hover:shadow-2xl transition duration-300 hover:border-[#139196] hover:-translate-y-1">
                                    <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 md:mb-2">
                                        Total Classes
                                    </h3>
                                    <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#139196]">
                                        {classes?.length}
                                        <span className="ml-2 text-gray-500 text-base md:mt-2">Classes added by our expert teachers</span>
                                    </p>
                                </div>
                            </Slide>

                            {/* Card for Total Enrollments */}
                            <Slide direction="up" triggerOnce delay={0.3}>
                                <div className="bg-white p-3 md:p-5 rounded-lg border border-gray-300 hover:shadow-2xl transition duration-300 hover:border-[#139196] hover:-translate-y-1">
                                    <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 md:mb-2">
                                        Total Enrollments
                                    </h3>
                                    <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#139196]">
                                        {enrollments?.length}
                                        <span className="ml-2 text-gray-500 text-base md:mt-2">Enrollments across all courses</span>
                                    </p>
                                </div>
                            </Slide>
                        </div>

                        {/* Right Section */}
                        <div className="bg-gradient-to-br from-[#66BE80] to-[#139196] rounded-lg md:rounded-3xl shadow-md">

                            <img
                                src={relevantImage}
                                alt="Education Platform"
                                className="rounded-lg md:rounded-3xl shadow-lg w-[350px] md:w-[500px]"
                            />

                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default StatsSection;
