import { FaLaptopCode, FaPaintBrush, FaMobileAlt, FaGamepad, FaShieldAlt, FaBrain, FaBullhorn, FaArrowRight, FaSearch, FaObjectGroup, FaCloud, FaChartLine } from "react-icons/fa";
import Heading from "../../../Shared/Heading/Heading";
import Container from "../../../Shared/Container/Container";
import { Link } from "react-router-dom";
import { Flip, Zoom } from "react-awesome-reveal";

const categories = [
    { name: "Web Development", icon: <FaLaptopCode className="text-2xl xl:text-3xl text-blue-400" /> },
    { name: "Web Design", icon: <FaPaintBrush className="text-2xl xl:text-3xl text-green-500" /> },
    { name: "Graphics Design", icon: <FaPaintBrush className="text-2xl xl:text-3xl text-purple-500" /> },
    { name: "App Development", icon: <FaMobileAlt className="text-2xl xl:text-3xl text-orange-500" /> },
    { name: "Game Development", icon: <FaGamepad className="text-2xl xl:text-3xl text-red-500" /> },
    { name: "Cyber Security", icon: <FaShieldAlt className="text-2xl xl:text-3xl text-teal-500" /> },
    { name: "Artificial Intelligence", icon: <FaBrain className="text-2xl xl:text-3xl text-pink-500" /> },
    { name: "Digital Marketing", icon: <FaBullhorn className="text-2xl xl:text-3xl text-yellow-500" /> },
    { name: "SEO Optimization", icon: <FaSearch className="text-2xl xl:text-3xl text-indigo-400" /> },
    { name: "UI/UX Design", icon: <FaObjectGroup className="text-2xl xl:text-3xl text-orange-300" /> },
    { name: "Cloud Computing", icon: <FaCloud className="text-2xl xl:text-3xl text-sky-400" /> },
    { name: "Data Science", icon: <FaChartLine className="text-2xl xl:text-3xl text-emerald-400" /> },
];


const Categories = () => {
    return (
        <div className="bg-white dark:bg-[#282834] py-12 md:py-16 ">
            <Container>
                <Heading subtitle={'Top Categories'} title={'Our Top Categories'}></Heading>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 ">
                    {categories.map((category, index) => (
                        <Zoom key={index} triggerOnce delay={index * 0.2}>
                            <div
                                
                                className="flex justify-between items-center h-[60px] p-4 sm:px-6 xl:px-8 rounded-md border-[1px] dark:border-gray-600 hover:-translate-y-1 transition-all duration-500  hover:bg-[#128F9D] hover:border-[#28dff3] group"
                            >
                                <h3 className="text-black dark:text-white text-sm md:text-xl lg:text-base font-medium group-hover:text-white transition-all duration-500 ease-in-out">{category.name}</h3>
                                <div className="">{category.icon}</div>
                            </div>
                        </Zoom>
                    ))}
                </div>
                <Link to='/allClasses' className="flex justify-center gap-2 mt-5 md:mt-10 dark:text-white">Browse All  <span className="flex items-center gap-1 text-[#0C8C9A] dark:text-[#66BE80]">Categories <FaArrowRight></FaArrowRight></span></Link>
            </Container>
        </div>
    );
};

export default Categories;
