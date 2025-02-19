import { Slide } from 'react-awesome-reveal';
import Container from '../../Shared/Container/Container';
import demoImage from '../../assets/whyus.jpg'
import { Link } from 'react-router-dom';

const WhyUs = () => {
    return (
        <section className="py-12 md:pb-16 lg:pb-20 bg-white dark:bg-[#282834]/95">
            <Container>
                <Slide triggerOnce>
                    <div className='mb-5 md:mb-8'>
                        <h1 className='text-black text-center lg:text-left dark:text-white text-2xl md:text-3xl lg:text-4xl font-bold'>Why Us?</h1>
                    </div>
                </Slide>
                <div className="flex flex-col-reverse lg:flex-row gap-8 md:mt-8">
                    <div className='lg:w-1/2'>
                        <p className="text-lg text-gray-800 dark:text-gray-300">
                            At SkillHorizon, we're dedicated to providing a comprehensive and engaging learning experience.  We understand the challenges faced by both students and educators in today's dynamic educational landscape, and we've designed our platform to address these challenges head-on.
                        </p>
                        <ul className="list-disc pl-6 mt-4 text-gray-800 dark:text-gray-200 xl:space-y-3">
                            <li><strong>Personalized Learning:</strong> Tailored courses to match your skill level and learning goals.</li>
                            <li><strong>Expert Instructors:</strong> Learn from experienced educators and industry professionals.</li>
                            <li><strong>Interactive Platform:</strong> Engaging tools and resources to enhance your learning.</li>
                            <li><strong>Community Support:</strong> Connect with fellow learners and build your network.</li>
                            <li><strong>Flexible Learning:</strong> Learn at your own pace, anytime, anywhere.</li>
                        </ul>
                        <Link to={'/allClasses'} className="mt-5 md:mt-8 text-white rounded-[5px] bg-gradient-to-br from-[#66BE80] to-[#139196] w-fit font-medium hover:bg-bg-gradient-to-br hover:from-[#139196] hover:to-[#139196] cursor-pointer px-5 md:px-6 py-2 md:py-3 flex justify-center items-center duration-1000 ease-in-out transition-all">
                            Get Started Today
                        </Link>
                    </div>
                    <div className='lg:w-1/2 '>
                        <img src={demoImage} alt="SkillHorizon Demo" className="rounded-lg shadow-md h-[300px] md:h-[350px] lg:h-[400px] w-full object-cover" />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default WhyUs;