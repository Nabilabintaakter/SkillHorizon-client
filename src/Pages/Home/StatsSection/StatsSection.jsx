import React from "react";
import relevantImage from "../../../assets/Devices-amico.png"; // Replace with your relevant image path
import Container from "../../../Shared/Container/Container";
import Heading from "../../../Shared/Heading/Heading";

const StatsSection = () => {
    const stats = [
        {
            title: "Total Users",
            value: "15",
            description: "Users actively using the platform",
        },
        {
            title: "Total Classes",
            value: "20",
            description: "Classes added by our expert teachers",
        },
        {
            title: "Total Enrollments",
            value: "10",
            description: "Enrollments across all courses",
        },
    ];

    return (
        <div className="my-12 md:my-16">
            <Container>
            <Heading subtitle='Our Impact in Numbers' title="Celebrating milestones of growth and success"></Heading>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:gap-10 lg:gap-28">
                        {/* Left Section */}
                        <div className="mt-6 sm:mt-0 flex flex-col gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-3 md:p-5 rounded-lg border border-gray-300 hover:shadow-2xl transition duration-300 hover:border-blue-400 hover:-translate-y-1 "
                                >
                                    <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 md:mb-2">
                                        {stat.title}
                                    </h3>
                                    <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#139196]">
                                        {stat.value}<span className="ml-2 text-gray-500 text-base md:mt-2">{stat.description}</span>
                                    </p>                                  
                                </div>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className=" bg-gradient-to-br from-[#66BE80] to-[#139196] rounded-lg md:rounded-3xl shadow-md">
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
