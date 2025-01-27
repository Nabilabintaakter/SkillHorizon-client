import { Outlet } from 'react-router-dom'
import Sidebar from '../../Shared/Sidebar/Sidebar';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';


const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex bg-white font-josefin'>
      <ScrollToTop></ScrollToTop>
      {/* Left Side: Sidebar Component */}
      <Sidebar></Sidebar>
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className=''>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout;