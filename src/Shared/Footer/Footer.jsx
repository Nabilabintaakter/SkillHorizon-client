import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import logo from '../../assets/l-1.png';
import text from '../../assets/l-2.png';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#282834] dark:bg-white pt-10 pb-5 text-white dark:text-[#282834]">
            <Container>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Logo and Description */}
                    <div>
                        <Link to={'/'} className='flex py-2 bg-white px-2 rounded-tr-2xl rounded-bl-2xl w-fit'>
                            <img className='h-16 lg:h-20' src={logo} alt="" />
                            <img className='w-32 lg:w-36 h-16 lg:h-20' src={text} alt="" />
                        </Link>
                        <p className="text-gray-400 mt-4">
                            Discover limitless learning opportunities and sharpen your skills in web development, AI, cybersecurity, and more.
                        </p>
                    </div>

                    {/* Quick Link */}
                    <div className='lg:mt-2'>
                        <h3 className="text-lg font-semibold">Quick Link</h3>
                        <ul className="text-gray-400 mt-4 space-y-2">
                            <li><a href="/allClasses" className="hover:text-[#139196]">Courses</a></li>
                            <li><a href="" className="hover:text-[#139196]">Featured Courses</a></li>
                            <li><a href="" className="hover:text-[#139196]">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Help Center */}
                    <div className='lg:mt-2'>
                        <h3 className="text-lg font-semibold">Help Center</h3>
                        <ul className="text-gray-400 mt-4 space-y-2">
                            <li><a href="" className="hover:text-[#139196]">Support</a></li>
                            <li><a href="" className="hover:text-[#139196]">Get Help</a></li>
                            <li><a href="/privacyPolicy" className="hover:text-[#139196]">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className='lg:mt-2'>
                        <h3 className="text-lg font-semibold">Contact Info</h3>
                        <div className="flex space-x-6 mt-2">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" text-blue-600 hover:scale-125 transition duration-500"
                            >
                                <FaFacebookF size={20} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" text-pink-500 hover:scale-125 transition duration-500"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:scale-125 transition duration-500"
                            >
                                <FaTwitter size={20} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:scale-125 transition duration-500"
                            >
                                <FaLinkedinIn size={20} />
                            </a>
                        </div>
                        <ul className="text-gray-400 mt-4 space-y-2">
                            <li><span className="font-semibold">Call Us:</span> +009 3067 321</li>
                            <li><span className="font-semibold">Address:</span> Dhanmondi 27, Dhaka, Bangladesh</li>
                            <li><span className="font-semibold">Mail Us:</span> support@skillhorizon.com</li>
                        </ul>
                    </div>
                </div>
            </Container>

            <Container>
                <div className="border-t border-t-gray-500 mt-8 pt-4 text-center">

                    <p className="text-gray-400">
                        &copy; SkillHorizon 2025. All Rights Reserved. Powered by{' '}
                        <a target="_blank" href="https://github.com/Nabilabintaakter" className="text-[#139196] hover:underline">Nabila Binta Akter</a>.
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
