import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import logo from '../../assets/Logo .png';
import Container from '../Container/Container';

const Footer = () => {
    return (
        <footer className="bg-[#282834] pt-10 pb-5 text-white">
            <Container>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Logo and Description */}
                    <div>
                        <img className="w-48" src={logo} alt="SkillHorizon Logo" />
                        <p className="text-gray-400 mt-4">
                            Discover limitless learning opportunities and sharpen your skills in web development, AI, cybersecurity, and more.
                        </p>
                    </div>

                    {/* Quick Link */}
                    <div>
                        <h3 className="text-lg font-semibold">Quick Link</h3>
                        <ul className="text-gray-400 mt-4 space-y-2">
                            <li><a href="/courses" className="hover:text-blue-500">Courses</a></li>
                            <li><a href="/about-us" className="hover:text-blue-500">About Us</a></li>
                            <li><a href="/terms" className="hover:text-blue-500">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Help Center */}
                    <div>
                        <h3 className="text-lg font-semibold">Help Center</h3>
                        <ul className="text-gray-400 mt-4 space-y-2">
                            <li><a href="/support" className="hover:text-blue-500">Support</a></li>
                            <li><a href="/get-help" className="hover:text-blue-500">Get Help</a></li>
                            <li><a href="/privacy-policy" className="hover:text-blue-500">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
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
                            <li><span className="font-semibold">Call Us:</span> +880-1711-xxxxxx</li>
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
                        <a target="_blank" href="https://github.com/Nabilabintaakter" className="text-blue-500 hover:underline">Nabila Binta Akter</a>.
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
