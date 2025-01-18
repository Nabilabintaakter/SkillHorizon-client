import React from "react";
import relevantImage from "../../../assets/Devices-amico.png"; // Replace with your relevant image path
import Container from "../../../Shared/Container/Container";
import Heading from "../../../Shared/Heading/Heading";

const StatsSection = () => {
    const stats = [
        {
            title: "Total Users",
            value: "15",
            description: "Users actively using the platform.",
        },
        {
            title: "Total Classes",
            value: "20",
            description: "Classes added by our expert teachers.",
        },
        {
            title: "Total Enrollments",
            value: "10",
            description: "Enrollments across all courses.",
        },
    ];

    return (
        <div className="my-12 md:my-16">
            <Container>
            <Heading subtitle='Our Impact in Numbers' title="Celebrating milestones of growth and success"></Heading>
                <div className="flex justify-center items-center">

                    <div className="flex flex-col lg:flex-row items-center gap-28">
                        {/* Left Section */}
                        <div className="flex flex-col gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-lg p-5 rounded-lg border border-gray-300 hover:shadow-2xl transition duration-300 hover:border-blue-400"
                                >
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                                        {stat.title}
                                    </h3>
                                    <p className="text-5xl font-bold text-[#139196]">
                                        {stat.value}
                                    </p>
                                    <p className="text-gray-500 mt-2">{stat.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="mt-10 lg:mt-0 bg-gradient-to-br from-[#66BE80] to-[#139196] rounded-3xl shadow-md">
                            <img
                                src={relevantImage}
                                alt="Education Platform"
                                className="rounded-3xl shadow-lg w-[500px]"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default StatsSection;
