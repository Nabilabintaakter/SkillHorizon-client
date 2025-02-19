import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../../Shared/Sidebar/Sidebar';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import { MdOutlineMenuBook } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import DarkModeToggle from '../../Shared/DarkModeToggle/DarkModeToggle';
import { IoMdSettings } from 'react-icons/io';


const DashboardLayout = () => {
  const { user } = useAuth();
  return (
    <div className='relative min-h-screen md:flex bg-white font-josefin'>
      <ScrollToTop></ScrollToTop>
      {/* Left Side: Sidebar Component */}
      <Sidebar></Sidebar>
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className=''>
          <div className='h-fit bg-white dark:bg-[#282834] w-full px-4 py-4'>
            <div className='flex items-center justify-between'>
              <p className='text-xl md:text-2xl dark:text-white font-medium flex items-center gap-3'><MdOutlineMenuBook className='mb-2 dark:text-white' /> Dashboard</p>
              <div className="flex justify-end items-center">
                <Link title='Profile' to={'/dashboard/profile'}><IoMdSettings className='text-xl mr-2 dark:text-white' /></Link>
                <div className='mr-3'><DarkModeToggle></DarkModeToggle></div>
                <div className="flex justify-end items-center ">
                  <div tabIndex={0} role="button" className=" avatar">
                    <div className="cursor-text w-10 rounded-full bg-[#128F9D] p-[1px]">
                      <img
                        className='rounded-full object-cover'
                        alt="User"
                        src={user?.photoURL} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout;