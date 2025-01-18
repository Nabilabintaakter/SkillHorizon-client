import { AiOutlineMenuFold } from 'react-icons/ai';
import logo from '../../assets/l-1.png';
import text from '../../assets/l-2.png';
import { Link, NavLink } from 'react-router-dom';
import Container from '../Container/Container';

const Navbar = () => {
    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `hover:text-lg hover:text-[#139196] transition-all duration-500 ${isActive ? 'text-[#139196] font-bold' : 'font-semibold'
                    }`
                }
            >
                Home
            </NavLink>

        </li>
        <li>
            <NavLink
                to="/allClasses"
                className={({ isActive }) =>
                    `hover:text-lg hover:text-[#139196] transition-all duration-500 ${isActive ? 'text-[#139196] font-bold' : 'font-semibold'
                    }`
                }>
                All Classes
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/teachOnSkill"
                className={({ isActive }) =>
                    `hover:text-lg hover:text-[#139196] transition-all duration-500 ${isActive ? 'text-[#139196] font-bold' : 'font-semibold'
                    }`
                }>
                Teach on SkillHorizon
            </NavLink>
        </li>
    </>
    return (
        <div className='bg-white text-black fixed top-0 bg-white/70 backdrop-blur-md z-50 w-full'>
            <Container>
            <div className="navbar mx-auto w-full p-0 ">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="bg-white p-1 mr-2 lg:hidden">
                                <AiOutlineMenuFold className='text-3xl text-[#023e8a]' />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white text-black rounded-box z-[1] mt-4 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <div className='flex'>
                            <img className=' h-10 md:h-14' src={logo} alt="" />
                            <img className='w-20 md:w-28 h-10 md:h-14' src={text} alt="" />
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex items-center gap-10">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <Link to='/login' className=" text-white rounded-[5px] bg-gradient-to-br from-[#66BE80] to-[#139196]  font-medium hover:bg-[#F66962] cursor-pointer px-5 md:px-8 py-2 md:py-[14px] flex justify-center items-center">Login Now</Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;