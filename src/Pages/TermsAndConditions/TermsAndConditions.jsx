import React from 'react';
import Container from '../../Shared/Container/Container';
import Heading from '../../Shared/Heading/Heading';
import { FaCheckCircle } from 'react-icons/fa';

const TermsAndConditions = () => {
    return (
        <section className="bg-gray-100 dark:bg-[#282834] py-5 min-h-screen md:pb-10">
            <Container>
                <div>
                    <Heading subtitle={'Terms and Conditions'} title={'SkillHorizon Terms and Conditions'} />

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">1. Accuracy and Validity of Information</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            We strive to provide accurate and up-to-date information on SkillHorizon, including course descriptions, instructor profiles, pricing details, and platform features. However, we do not guarantee the completeness, reliability, or suitability of the information for any particular purpose.  Information may change without notice, and we are not liable for any errors or omissions in the content. Any reliance you place on such information is therefore strictly at your own risk. It is your responsibility to verify any information before relying on it.
                        </p>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">2. Availability</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            We make every effort to ensure that SkillHorizon is available 24 hours a day, 7 days a week. However, we do not guarantee uninterrupted access to our website or services.  We may need to perform scheduled maintenance, implement updates, or experience technical issues (such as server outages, network problems, or software bugs) that could result in temporary downtime or service disruptions. We are not liable for any loss or inconvenience you may experience due to such downtime.
                        </p>
                        <ul className="list-none mt-4 text-gray-700 dark:text-gray-300">
                            <li>
                                <FaCheckCircle className="inline-block mr-2 mb-1 text-green-500" />
                                <strong>Scheduled Maintenance:</strong> We may need to take the platform offline for maintenance, but will try to provide notice.
                            </li>
                            <li>
                                <FaCheckCircle className="inline-block mr-2 mb-1 text-green-500" />
                                <strong>Technical Issues:</strong> We are not responsible for downtime caused by factors beyond our control.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">3. Third Party Websites</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            SkillHorizon may contain links to third-party websites, including websites of instructors, partners, or other resources. We are not responsible for the content, accuracy, or privacy practices of these websites.  These links are provided for your convenience only, and their presence does not imply any endorsement by SkillHorizon. We encourage you to review the terms and conditions and privacy policies of any third-party websites you visit.
                        </p>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">4. Copyright and Intellectual Property</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            All content on SkillHorizon, including text, graphics, logos, images, software, course materials, videos, and other content, is the property of SkillHorizon or its licensors (including instructors) and is protected by copyright and other intellectual property laws.  You may not use, reproduce, modify, distribute, or display any content from SkillHorizon without our prior written consent or the consent of the respective copyright holder.
                        </p>
                        <ul className="list-none mt-4 text-gray-700 dark:text-gray-300">
                            <li>
                                <FaCheckCircle className="inline-block mr-2 mb-1 text-green-500" />
                                <strong>Course Materials:</strong>  Instructors retain copyright in their course materials.
                            </li>
                            <li>
                                <FaCheckCircle className="inline-block mr-2 mb-1 text-green-500" />
                                <strong>User Content:</strong> Users retain copyright in their own user-generated content, but grant SkillHorizon a license to use it.
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">6. Termination of Contract</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            We reserve the right to terminate your access to SkillHorizon, or any portion of the services, at any time, for any reason, with or without notice, including but not limited to breach of these Terms and Conditions, violation of our Community Guidelines, or suspected illegal activity.  Upon termination, your account will be deactivated, and you will no longer have access to your courses or other content.
                        </p>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl font-bold mb-2 dark:text-white">7. Limitation of Liability</h2>
                        <p className='text-gray-600 dark:text-gray-300'>
                            To the fullest extent permitted by law, SkillHorizon, its affiliates, officers, directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages (including, without limitation, damages for lost profits, data loss, or business interruption) arising out of or in connection with your use of our website or services, even if we have been advised of the possibility of such damages.  Our total liability to you for any claim arising out of or relating to these Terms and Conditions or your use of SkillHorizon will not exceed the amount you have paid us (if any) in the twelve (12) months preceding the claim.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default TermsAndConditions;