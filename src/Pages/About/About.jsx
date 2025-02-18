import React from 'react';
import Heading from '../../Shared/Heading/Heading';
import { FaLightbulb, FaRocket, FaUserGraduate, FaBullseye } from 'react-icons/fa';
import { Slide } from "react-awesome-reveal";
import Container from '../../Shared/Container/Container';
import WhyUs from './whyUs';

const About = () => {
    return (
        <div>
            <div className="py-5 md:py-10 bg-[#FAFBFD] dark:bg-[#282834]">
                <Container>
                    <Heading title={'Learn More About SkillHorizon'} subtitle={'About Us'} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
                        <Slide direction="up" triggerOnce>
                            <div className="bg-white rounded-lg hover:shadow-md p-6 flex flex-col items-center h-full hover:-translate-y-[6px]  transition-transform duration-700 ease-out">
                                <div className="text-4xl text-blue-500 mb-4">
                                    <FaLightbulb />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-center">Our Philosophy</h3>
                                <p className="text-gray-700 text-center flex-grow text-base"> 
                                    We believe in fostering a dynamic learning environment where students are empowered to explore, innovate, and achieve their full potential. We prioritize practical skills and real-world application.
                                </p>
                            </div>
                        </Slide>

                        <Slide direction="up" triggerOnce delay={100}>
                            <div className="bg-white rounded-lg hover:shadow-md p-6 flex flex-col items-center h-full hover:-translate-y-[6px]  transition-transform duration-700 ease-out">
                                <div className="text-4xl text-green-500 mb-4">
                                    <FaRocket />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-center">Our Mission</h3>
                                <p className="text-gray-700 text-center flex-grow text-base"> 
                                    To provide accessible and high-quality education that equips students with the skills and knowledge they need to succeed in the digital age. We strive to bridge the gap between education and industry demands.
                                </p>
                            </div>
                        </Slide>

                        <Slide direction="up" triggerOnce delay={200}>
                            <div className="bg-white rounded-lg hover:shadow-md p-6 flex flex-col items-center h-full hover:-translate-y-[6px]  transition-transform duration-700 ease-out">
                                <div className="text-4xl text-yellow-500 mb-4">
                                    <FaUserGraduate />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-center">Our Vision</h3>
                                <p className="text-gray-700 text-center flex-grow text-base">
                                    To be the leading platform for online education, recognized for its innovative approach to learning, its commitment to student success, and its contribution to the global knowledge economy.
                                </p>
                            </div>
                        </Slide>

                        <Slide direction="up" triggerOnce delay={300}>
                            <div className="bg-white rounded-lg hover:shadow-md p-6 flex flex-col items-center h-full hover:-translate-y-[6px]  transition-transform duration-700 ease-out">
                                <div className="text-4xl text-red-500 mb-4">
                                    <FaBullseye />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-center">Key to Success</h3>
                                <p className="text-gray-700 text-center flex-grow text-base"> 
                                    Continuous improvement, personalized learning paths and a focus on practical application are the cornerstones of our success. We embrace feedback and adapt to the evolving needs of our community.
                                </p>
                            </div>
                        </Slide>
                    </div>
                </Container>
            </div>
            <WhyUs></WhyUs>
        </div>
    );
};

export default About;