import React from "react";
import instructorImage from "../../../assets/teacher.jpg";
import Container from "../../../Shared/Container/Container";
import { Link } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";

const JoinAsInstructor = () => {
    return (
        <div className="bg-white dark:bg-[#282834] py-16 md:py-20 ">
            <Container>
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    {/* Left Section */}
                    <div className="md:w-1/2">
                        <div className="relative">
                            <div className="absolute -top-3 md:-top-7 -left-3 md:-left-7 bg-[#66BE80] rounded-full w-8 h-8 md:w-16 md:h-16"></div>
                            <div className="absolute -bottom-3 md:-bottom-7 -right-3 md:-right-7 bg-[#139196] rounded-full w-8 h-8 md:w-16 md:h-16"></div>
                            <img
                                src={instructorImage}
                                alt="Inspire as an Instructor"
                                className="rounded-tr-2xl rounded-bl-2xl shadow-lg w-full relative z-10"
                            />
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="md:w-1/2">
                        <h2 className="text-black dark:text-white text-2xl  lg:text-4xl font-bold mb-2 lg:mb-4 lg:w-[90%]">
                            Become an Instructor Today and Start Teaching
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 lg:text-lg lg:leading-relaxed mb-3 lg:mb-6">
                            Instructors from around the world teach millions of students on SkillHorizon.
                            We provide the tools and skills to teach what you love. Join us and
                            achieve your goals while inspiring the next generation of learners.
                        </p>
                        <Zoom triggerOnce>
                            <Link to='/teachOnSkill' className=" text-white rounded-[5px] bg-gradient-to-br from-[#66BE80] to-[#139196] w-fit font-medium hover:bg-bg-gradient-to-br hover:from-[#139196] hover:to-[#139196] cursor-pointer px-5 md:px-6 py-2 md:py-3 flex justify-center items-center duration-1000 ease-in-out transition-all">Become an Instructor</Link>
                        </Zoom>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default JoinAsInstructor;
