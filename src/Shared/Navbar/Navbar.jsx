import { AiOutlineMenuFold } from 'react-icons/ai';
import logo from '../../assets/l-1.png';
import text from '../../assets/l-2.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Container from '../Container/Container';
import { MdOutlineLogout } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, signingOut } = useAuth();
    const navigate = useNavigate();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const handleSignOut = () => {
        signingOut()
            .then(() => {
                navigate('/')
            })
            .catch(err => {
                // console.log(err)
            })
    }

    const links = <>
        <li>
            <NavLink
                onClick={scrollToTop}
                to="/"
                className={({ isActive }) =>
                    ` hover:text-[#139196] transition-all duration-500 ${isActive ? 'text-[#139196] font-bold' : 'font-semibold'
                    }`
                }
            >
                Home
            </NavLink>

        </li>
        <li>
            <NavLink
                onClick={scrollToTop}
                to="/allClasses"
                className={({ isActive }) =>
                    ` hover:text-[#139196] transition-all duration-500 ${isActive ? 'text-[#139196] font-bold' : 'font-semibold'
                    }`
                }>
                All Classes
            </NavLink>
        </li>
        <li>
            <NavLink
                onClick={scrollToTop}
                to="/teachOnSkill"
                className={({ isActive }) =>
                    ` hover:text-[#139196] transition-all duration-500 ${isActive ? 'text-[#139196] font-bold' : 'font-semibold'
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
                                <AiOutlineMenuFold className='text-3xl text-[#128F9D]' />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white text-black rounded-box z-[1] mt-4 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <Link to={'/'} className='flex'>
                            <img className=' h-10 md:h-14' src={logo} alt="" />
                            <img className='w-20 md:w-28 h-10 md:h-14' src={text} alt="" />
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex items-center gap-10">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end flex justify-end items-center">
                        {
                            user ?
                                <div className="dropdown dropdown-end flex justify-end items-center">
                                    <div tabIndex={0} role="button" className=" avatar">
                                        <div className="w-10 rounded-full bg-[#128F9D] p-[1px]">
                                            <img
                                                className='rounded-full object-cover'
                                                alt="User"
                                                src={user?.photoURL} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-green-50 rounded-md z-[1] mt-48 w-40 md:w-52 p-2 lg:p-3 shadow">

                                        <p className='text-blue-950 md:text-lg font-bold text-center mb-3'>{user?.displayName}</p>

                                        <li><NavLink
                                            onClick={scrollToTop}
                                            to="/dashboard/profile"
                                            className={({ isActive }) =>
                                                ` hover:text-[#139196] transition-all duration-500 bg-[#139196] bg-opacity-35 rounded-[5px] flex justify-center items-center ${isActive ? 'text-[#139196] font-bold' : 'font-semibold'
                                                }`
                                            }
                                        >
                                            Dashboard
                                        </NavLink></li>
                                        <li><button onClick={handleSignOut} className=" text-white rounded-[5px] bg-gradient-to-br from-red-600 to-red-700  font-medium hover:bg-gradient-to-br hover:from-red-700 hover:to-red-800 cursor-pointer px-5 flex justify-center items-center duration-1000 ease-in-out transition-all mt-1"><MdOutlineLogout></MdOutlineLogout>Log Out</button></li>
                                    </ul>
                                </div>
                                :
                                <Link to='/login' className=" text-white rounded-[5px] bg-gradient-to-br from-[#66BE80] to-[#139196]  font-medium hover:bg-gradient-to-br hover:from-[#139196] hover:to-[#139196] cursor-pointer px-5 md:px-6 py-2 md:py-3 flex justify-center items-center duration-1000 ease-in-out transition-all">Login Now</Link>
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;