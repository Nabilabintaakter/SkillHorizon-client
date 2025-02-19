
import { NavLink } from 'react-router-dom'

const MenuItem = ({ label, address, icon: Icon }) => {
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
  return (
    <NavLink
    onClick={scrollToTop}
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 mx-2 py-2 my-1 hover:bg-[#009478] hover:text-white transition-colors duration-300 transform rounded-lg ${
          isActive ? 'bg-[#009478]  text-white' : 'text-[#009478]'
        }`
      }
    >
      <Icon className='w-5 h-5' />

      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  )
}

export default MenuItem;