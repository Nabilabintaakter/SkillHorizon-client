import { FaPlusSquare } from "react-icons/fa";
import { BiBookAlt } from "react-icons/bi";
import MenuItem from './MenuItem'
const TeacherMenu = () => {
  return (
    <>
      <MenuItem  icon={FaPlusSquare}  label='Add Class'  address='add-class'/>
      <MenuItem icon={BiBookAlt} label='My Class' address='my-class' />
    </>
  )
}

export default TeacherMenu;