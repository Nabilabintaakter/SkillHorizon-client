import React from 'react';
import Container from '../../Shared/Container/Container'; // Assuming you have a Container component
import Heading from '../../Shared/Heading/Heading';
import { FaCheckCircle } from 'react-icons/fa';

const PrivacyPolicy = () => {
    return (
        <section className="bg-gray-100 dark:bg-[#282834] py-5 min-h-screen md:pb-10">
            <Container>
                <div>
                    <Heading subtitle={'Privacy Policy'} title={'SkillHorizon Privacy Policy'}></Heading>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">1. Personal Information:</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            At SkillHorizon, we deeply value and are committed to protecting the privacy of our users. This Privacy Policy is designed to clearly explain how we collect, use, and, under limited circumstances, share your personal information when you access and use our website, SkillHorizon, and the various educational services we offer.  This policy aims to be transparent about our data handling practices so you can make informed decisions about your privacy while using our platform.
                        </p>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">2. Collecting Personal Information:</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            When you choose to create an account on SkillHorizon, we collect essential information, including your name, email address, and any other relevant details you voluntarily provide to us during the registration process. This information is crucial for setting up and managing your personalized learning experience on our platform. In addition to this, we may also collect information regarding your activity on SkillHorizon, such as the specific courses you enroll in, the assignments you submit for evaluation, your progress within those courses, and any interactions you have with other users or instructors on the platform. This data helps us understand user behavior, personalize learning paths, and improve our services.
                        </p>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">3. Using and Disclosing Your Personal Information:</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            SkillHorizon utilizes the collected personal information to provide you with seamless access to our website and the diverse range of educational services we offer. This information allows us to personalize your learning journey, tailoring course recommendations and resources to your specific needs and interests. Furthermore, we use your information to effectively communicate with you regarding your account, updates to our services, important announcements, and any inquiries you may have.
                        </p>
                        <p className='mt-3 text-gray-600 dark:text-gray-300'>
                            We may also use your information, with your consent, to send you marketing communications about new courses, platform features, special promotions, or other relevant updates. We want to assure you that SkillHorizon will never share your personal information with any third-party entities without your explicit consent, unless we are legally required to do so by applicable law, regulation, or legal process. We are committed to maintaining the confidentiality and security of your data.
                        </p>
                        <ul className="list-none mt-4 text-gray-700 dark:text-gray-300">
                            <li>
                                <FaCheckCircle className="inline-block mr-2 mb-1 text-green-500" />
                                <strong>Personalized Learning:</strong> Tailoring course recommendations and resources to your specific needs and interests.
                            </li>
                            <li>
                                <FaCheckCircle className="inline-block mr-2 mb-1 text-green-500" />
                                <strong>Communication:</strong> Keeping you informed about your account, updates, and important announcements.
                            </li>
                            <li>
                                <FaCheckCircle className="inline-block mr-2 mb-1 text-green-500" /> 
                                <strong>Marketing (with consent):</strong> Sending you updates about new courses, features, and promotions.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">4. Contact by the Company:</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            SkillHorizon may, from time to time, need to contact you via email or other appropriate communication channels to keep you informed about important matters related to your account, updates or changes to our services, or to provide you with relevant marketing communications (with your prior consent).  These communications are essential for ensuring a smooth user experience and keeping you up-to-date with the latest developments on SkillHorizon.  
                        </p>
                        <p className='mt-3 text-gray-600 dark:text-gray-300'>If, at any point, you decide that you no longer wish to receive marketing communications from us, you can easily opt out by clicking on the "unsubscribe" link that will be included in all such emails.  We respect your preferences and will promptly remove you from our marketing list.</p>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">5. Individual's Right of Access:</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            At SkillHorizon, we believe in empowering you with control over your personal information. You have the inherent right to access, review, and update your personal information whenever you choose.  This can be easily done by logging into your SkillHorizon account, where you can manage and modify your profile details.  If, for any reason, you wish to request the deletion of your personal information from our systems, you can do so by reaching out to us through our designated contact channels.  We will process your request in accordance with applicable data protection laws and regulations.
                        </p>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">6. The Company and Links to Other Websites:</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            SkillHorizon's website may, from time to time, contain links to external websites that are operated by third parties. While we strive to provide you with valuable resources and connections, it's important to understand that SkillHorizon does not have control over the privacy practices or content of these external websites. Therefore, we cannot be held responsible for how these websites collect, use, or share your information. We strongly encourage you to exercise caution and review the privacy policies of any external websites you visit before providing them with your personal information. This will help you make informed decisions about your data privacy while browsing the internet.
                        </p>
                        <ul className=" mt-4 text-gray-700 dark:text-gray-300 list-none">
                            <li>
                                <FaCheckCircle className="inline-block mr-2 mb-1 text-green-500" />
                                <strong>Third-Party Links:</strong> SkillHorizon is not responsible for the privacy practices of linked websites.
                            </li>
                            <li>
                                <FaCheckCircle className="inline-block mr-2 mb-1 text-green-500" />
                                <strong>Recommendation:</strong> Review the privacy policies of external websites before using them.
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default PrivacyPolicy;