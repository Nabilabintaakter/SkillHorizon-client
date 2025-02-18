import { ScaleLoader } from "react-spinners"


const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center bg-white dark:bg-[#282834]`}
    >
      <ScaleLoader size={100} color='#3AA2AC' />
    </div>
  )
}

export default LoadingSpinner;