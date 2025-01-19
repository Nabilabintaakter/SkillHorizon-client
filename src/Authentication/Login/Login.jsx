import image from '../../assets/Tablet login-bro.png';
import image2 from '../../assets/plant.png';
import Container from '../../Shared/Container/Container';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useContext, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const {handleLogin} = useContext(AuthContext);

    const onSubmit = data => {
        console.log(data)
        handleLogin(data.email, data.password)
        .then(res=>{
            const user = res.user
            console.log(user);
        })
    };

    return (
        <Container>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 bg-gradient-to-r from-[#95D3A2] to-[#36A0AD] h-[260px] sm:h-[400px] md:h-[560px] flex flex-col items-center justify-center relative'>
                    <img className='w-[30%] md:w-[70%] lg:w-[50%] h-fit animate-pulse z-10' src={image} alt="" />
                    <img className='absolute left-[120px] sm:left-44 lg:left-[112px] top-[40px] sm:top-[80px] lg:top-10 w-[30%] md:w-[70%] lg:w-[60%] h-fit' src={image2} alt="" />
                    <h1 className='text-white text-center text-2xl sm:text-3xl lg:text-[40px] font-bold w-[90%] sm:w-[70%] md:w-[90%] lg:w-[70%] leading-none mt-2 sm:mt-0 mb-2 sm:mb-3'>Turn your ambition into a success history</h1>
                    <p className='text-sm sm:text-base text-white text-center'>Choose from over 50+ online courses</p>
                </div>
                {/* right side */}
                <div className="w-full md:w-1/2 mt-8 md:mt-2 px-5 sm:px-10 md:pl-8 lg:px-20 flex flex-col justify-center items-center sm:justify-start sm:items-start mb-5 md:mb-0">
                    <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold mb-2 text-gray-800">Welcome Back, Nabila!</h2>
                    <p className="text-gray-500 mb-4 text-center md:text-left md:text-lg">Login with your data that you entered during your Registration.</p>
                    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-base md:text-sm font-medium text-gray-700 mb-1">Email address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#66BE80] placeholder:text-gray-300 placeholder:font-normal"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-base md:text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#66BE80] placeholder:text-gray-300 placeholder:font-normal"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                })}
                            />
                            <span className="absolute right-3 top-10 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ?
                                    <IoMdEye className='text-xl' />
                                    :
                                    <IoMdEyeOff className='text-xl' />
                                }
                            </span>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                        <button type='submit' className=" text-white rounded-[5px] bg-gradient-to-r from-[#66BE80] to-[#139196]  font-medium hover:bg-gradient-to-r hover:from-[#139196] hover:to-[#139196]  cursor-pointer w-full py-2 md:py-[14px] flex justify-center items-center duration-1000 ease-in-out transition-all">Login</button>
                        <div className="divider">OR</div>
                        <button className="w-full mt-4 py-3 rounded-md border border-gray-300 hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-2">
                            <FcGoogle className='text-2xl'/> Sign with Google
                        </button>
                        <p className='mt-5 text-center'>Don't have an account? <Link className='text-[#30A18E]' to={'/signUp'}>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default Login;