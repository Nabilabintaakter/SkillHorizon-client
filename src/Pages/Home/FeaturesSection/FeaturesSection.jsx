import React from "react";
import { FaChalkboardTeacher, FaLightbulb, FaBookOpen, FaHandsHelping, FaTasks } from "react-icons/fa";
import Heading from "../../../Shared/Heading/Heading";
import Container from "../../../Shared/Container/Container";

const FeaturesSection = () => {
    const features = [
        {
            title: "Expert-Led Courses",
            description: "Get trained by industry-leading professionals in fields like Web Development, AI, and Cyber Security.",
            icon: <FaChalkboardTeacher className="text-6xl lg:text-7xl text-blue-500 mx-auto" />,
        },
        {
            title: "In-Demand Skills",
            description: "Learn trending skills like Data Science, UI/UX Design, and Cloud Computing to stay ahead in your career.",
            icon: <FaLightbulb className="text-6xl lg:text-7xl text-yellow-500 mx-auto" />,
        },
        {
            title: "Skill Assignments",
            description: "Enhance your skills by completing hands-on assignments and solving real-world challenges in your courses.",
            icon: <FaTasks className="text-6xl lg:text-7xl text-purple-500 mx-auto" />,
        },
        {
            title: "Interactive Learning",
            description: "Engage in real-world projects and tasks to strengthen your skills through hands-on experience.",
            icon: <FaHandsHelping className="text-6xl lg:text-7xl text-red-500 mx-auto" />,
        },
    ];

    return (
        <div className="bg-[#F1EFEE] py-10 md:pb-16">
            <Container>
                <Heading subtitle={'Our Features'} title={'Why You Should Choose Our Platform'}></Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 lg:gap-5">
                    {features.map((feature, index) => (
                        <div
                        key={index}
                        className="bg-white rounded-3xl p-6 py-8 xl:py-10 text-center hover:-translate-y-[6px]  transition-transform duration-700 ease-out"
                    >
                        <div className="mb-4 md:mb-7">{feature.icon}</div>
                        <h3 className="text-xl md:text-2xl text-black font-bold mb-3 md:mb-6">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                    
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default FeaturesSection;
