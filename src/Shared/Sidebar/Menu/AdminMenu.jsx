import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={AiOutlineUsergroupAdd} label='Teacher Request' address='teacher-request' />
      <MenuItem icon={FaUserCog} label='Users' address='users' />
      <MenuItem icon={FaChalkboardTeacher} label='All Classes' address='all-classes' />
    </>
  )
}

export default AdminMenu