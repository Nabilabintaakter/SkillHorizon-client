import React from 'react';
import Container from '../../Shared/Container/Container';
import education from '../../assets/Education-bro.png';
import { Zoom } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

const BeAMember = () => {
    return (
        <section className="bg-[#F4F6F8] dark:bg-[#282834] mt-8 md:mt-10 lg:mt-16 pb-8 md:pb-16">
            <Container>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 items-center">
                    <div>
                        <img
                            src={education}
                            alt="education online"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="text-left md:text-left">
                        <h2 className="text-3xl dark:text-white font-bold mb-4">
                            Be A Member Of SkillHorizon <br />
                            Business & Start Earning <br />
                            Limitless Today
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                            Instructors from around the world teach millions of students on SkillHorizon. We provide the tools and skills to teach what you love. And you can also achieve your goal with us.
                        </p>
                        <Zoom triggerOnce>
                            <Link to='/teachOnSkill' className=" text-white rounded-[5px] bg-gradient-to-br from-[#66BE80] to-[#139196] w-fit font-medium hover:bg-bg-gradient-to-br hover:from-[#139196] hover:to-[#139196] cursor-pointer px-5 md:px-6 py-2 md:py-3 flex justify-center items-center duration-1000 ease-in-out transition-all">Get SkillHorizon Business </Link>
                        </Zoom>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default BeAMember;