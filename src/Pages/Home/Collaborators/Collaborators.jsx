import React from "react";
import ph from "../../../assets/ph.jpeg";
import Coursera from "../../../assets/coursera.webp";
import edx from "../../../assets/edx.png";
import khan from "../../../assets/unnamed.jpg";
import w3 from "../../../assets/w3schools_logo_500_04AA6D.png.f19139956c5b9eec280626cfa633bc80.png";
import skill from "../../../assets/Skillshare_Logo.png";
import Container from "../../../Shared/Container/Container";
import Heading from "../../../Shared/Heading/Heading";
import { Slide } from "react-awesome-reveal";

const Collaborators = () => {
    const collaborators = [
        {
            name: "Programming Hero",
            logo: ph,
            description: "Interactive platform for learning web and app development.",
            bgColor: "bg-[#7E119A]",
        },
        {
            name: "W3Schools",
            logo: w3,
            description: "Free tutorials for web development and programming.",
            bgColor: "bg-[#08AA6E]",
        },
        {
            name: "Coursera",
            logo: Coursera,
            description: "Online courses from top universities and companies worldwide.",
            bgColor: "bg-[#3B72B9]",
        },
        {
            name: "edX",
            logo: edx,
            description: "Free and paid courses from leading institutions like MIT and Harvard.",
            bgColor: "bg-[#B72667]",
        },
        {
            name: "Khan Academy",
            logo: khan,
            description: "Free educational resources for students and learners globally.",
            bgColor: "bg-[#14BF95]",
        },
        {
            name: "Skillshare",
            logo: skill,
            description: "Online creative classes for personal and professional development.",
            bgColor: "bg-[#18C5CB]",
        },
    ];

    return (
        <div className="my-12 md:my-16">
            <Container>
                <div className=" text-center">
                    <Heading subtitle={'Trusted Partners'} title={'Empowering Learning Together with Renowned Platforms'}></Heading>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {collaborators.map((collaborator, index) => (
                            <Slide  
                                triggerOnce 
                            >
                                <div
                                
                                key={index}
                                    className={`relative group ${collaborator.bgColor} shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-opacity-15`}
                                >
                                    
                                    <div className="flex justify-center items-center p-8">
                                        <img
                                            src={collaborator.logo}
                                            alt={collaborator.name}
                                            className="w-12 h-12 md:w-20 md:h-20 object-contain"
                                        />
                                    </div>
                                    {/* Card Hover Content */}
                                    <div
                                        className={`absolute inset-0 ${collaborator.bgColor} bg-opacity-80 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-center items-center text-white text-sm px-2 md:px-4`}
                                    >
                                        <h3 className="font-semibold text-xl md:text-2xl md:mb-2">{collaborator.name}</h3>
                                        <p className="text-center text-sm md:text-lg">{collaborator.description}</p>
                                    </div>
                                </div>
                            </Slide>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Collaborators;
