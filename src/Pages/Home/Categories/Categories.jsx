import { FaLaptopCode, FaPaintBrush, FaMobileAlt, FaGamepad, FaShieldAlt, FaBrain, FaBullhorn, FaArrowRight } from "react-icons/fa";
import Heading from "../../../Shared/Heading/Heading";
import Container from "../../../Shared/Container/Container";
import { Link } from "react-router-dom";

const categories = [
    { name: "Web Development", icon: <FaLaptopCode className="text-4xl text-blue-400" /> },
    { name: "Web Design", icon: <FaPaintBrush className="text-4xl text-green-500" /> },
    { name: "Graphics Design", icon: <FaPaintBrush className="text-4xl text-purple-500" /> },
    { name: "App Development", icon: <FaMobileAlt className="text-4xl text-orange-500" /> },
    { name: "Game Development", icon: <FaGamepad className="text-4xl text-red-500" /> },
    { name: "Cyber Security", icon: <FaShieldAlt className="text-4xl text-teal-500" /> },
    { name: "Artificial Intelligence", icon: <FaBrain className="text-4xl text-pink-500" /> },
    { name: "Digital Marketing", icon: <FaBullhorn className="text-4xl text-yellow-500" /> },
];

const Categories = () => {
    return (
        <div className="my-16 md:my-20">
            <Container>
                <Heading subtitle={'Top Categories'} title={'Our Top Categories'}></Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 group">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-6 px-8 rounded-md border-2 hover:-translate-y-1 transition-all duration-500 cursor-pointer hover:bg-[#128F9D] hover:text-white hover:border-[#28dff3]"
                        >
                            <h3 className="text-xl">{category.name}</h3>
                            <div className="">{category.icon}</div>
                        </div>
                    ))}
                </div>
                <Link to='/allClasses' className="flex justify-center gap-2 mt-5 md:mt-10">Browse All  <span className="flex items-center gap-1 text-[#0C8C9A]">Categories <FaArrowRight></FaArrowRight></span></Link>
            </Container>
        </div>
    );
};

export default Categories;
