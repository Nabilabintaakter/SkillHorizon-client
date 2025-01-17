import { AiOutlineMenuFold } from 'react-icons/ai';
import logo from '../../assets/Logo .png';
import { Link, NavLink } from 'react-router-dom';
import Container from '../Container/Container';

const Navbar = () => {
    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'text-[#90e0ef] font-medium border-b-2 border-b-[#90e0ef]' : '')}>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/allClasses"
                className={({ isActive }) => (isActive ? 'text-[#90e0ef] font-medium' : '')}>
                All Classes
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/techOnSkillHorizon"
                className={({ isActive }) => (isActive ? 'text-[#90e0ef] font-medium' : '')}>
                Tech on SkillHorizon
            </NavLink>
        </li>
    </>
    return (
        <div className='bg-[#023e8a]'>
            <Container>
                <div className="navbar text-white p-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="bg-white p-1 mr-2 lg:hidden">
                                <AiOutlineMenuFold className='text-3xl text-[#023e8a]' />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-[#023e8a] text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <img className='w-36' src={logo} alt="" />
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex items-center gap-6">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <Link to={'/signIn'} className="px-5 py-2 bg-gradient-to-tr from-green-600 to-green-400  font-medium hover:bg-gradient-to-tr hover:from-green-700 hover:to-green-500 cursor-pointer">Sign In</Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;