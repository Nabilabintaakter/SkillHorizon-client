import React from 'react';
import Heading from '../../Shared/Heading/Heading';
import Container from '../../Shared/Container/Container';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';

const Contact = () => {
    return (
        <div className="py-5 md:py-10 bg-white">
            <Container>
                <Heading title={'Contact Us'} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-8">
                    <div className="bg-[#EBF5FB] rounded-lg shadow-md p-6 lg:p-10 flex justify-center items-center border-t-4 border-[#2196F3] hover:-translate-y-[6px]  transition-transform duration-700 ease-out">
                        <div className='flex gap-4 items-center'>
                            <div className="text-xl lg:text-3xl text-[#2196F3] p-4 bg-white rounded-full mb-4">
                                <FaPhoneAlt />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                                <p>+009 3067 321</p>
                                <p>+009 5847 933</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#FFF5EE] rounded-lg shadow-md p-6 lg:p-10 flex justify-center items-center border-t-4 border-[#FF9800] hover:-translate-y-[6px]  transition-transform duration-700 ease-out">
                        <div className='flex gap-4 items-center'>
                            <div className="text-xl lg:text-3xl text-[#FF9800] mb-4 p-4 bg-white rounded-full">
                                <FaEnvelope />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold mb-2">Mail Us</h3>
                                <p>support@skillhorizon.com</p>
                                <p>info@skillhorizon.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#E8F5E9] rounded-lg shadow-md p-6 lg:p-10 flex justify-center items-center border-t-4 border-[#4CAF50] md:col-span-2 lg:col-span-1 hover:-translate-y-[6px]  transition-transform duration-700 ease-out">
                        <div className='flex gap-4 items-center'>
                            <div className="text-xl lg:text-3xl text-[#4CAF50] mb-4 p-4 bg-white rounded-full">
                                <FaMapMarkerAlt />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                                <p>Dhanmondi 27, Dhaka, </p>
                                <p>Bangladesh</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 rounded-lg p-8 w-2/3 mx-auto">
                    <Fade triggerOnce>
                        <div className='text-center mb-8 md:mb-12'>
                            <p className='text-[#0886A0] mb-3 font-medium'>Contact Us</p>
                            <h1 className='text-black text-2xl md:text-3xl lg:text-4xl font-bold w-[90%]  mx-auto'>Send Us Message Anytime</h1>
                        </div>
                    </Fade>
                    <form action="https://api.web3forms.com/submit" method="POST" className=" rounded-md">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3_API} />
                            <input required type="text" name="form_name" placeholder="Your Name" className="bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3FC8B1]" />

                            <input required type="email" name="email" placeholder="Email address" className="bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3FC8B1]" />

                        </div>
                        <textarea required name="message" placeholder="Your message" rows="4" className="bg-gray-100 rounded-md px-4 py-2 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-[#3FC8B1]"></textarea>
                        <div className='flex justify-center items-center mt-5'>
                            <button type='submit' className="text-white rounded-[5px] bg-gradient-to-br from-[#66BE80] to-[#139196]  font-medium hover:bg-gradient-to-br hover:from-[#139196] hover:to-[#139196] cursor-pointer px-5 md:px-6 py-2 md:py-3 flex justify-center items-center duration-1000 ease-in-out transition-all">Send Message</button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Contact;