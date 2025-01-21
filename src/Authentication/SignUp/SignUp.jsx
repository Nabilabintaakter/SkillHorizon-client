import image from '../../assets/Tablet login-bro.png';
import image2 from '../../assets/plant.png';
import Container from '../../Shared/Container/Container';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import { imageUpload } from '../../api/utils';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useMutation } from '@tanstack/react-query';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUser, setLoading, createUser, handleUpdateProfile, signInWithGoogle, loading } = useAuth();
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    // useMutation hook
    // const queryClient = useQueryClient()
    // const navigate = useNavigate()
    const { mutateAsync } = useMutation({
        mutationFn: async userData => {
            await axiosPublic.post(`/users`, userData)
        },
        onSuccess: () => {
            console.log('user data saved')
            // queryClient.invalidateQueries({ queryKey: ['classes'] })
        },
        onError: err => {
            console.log(err.message)
        },
    })

    const onSubmit = async (data) => {
        const phone = parseInt(data?.phoneNumber, 10)
        console.log(phone);
        const file = data.image;
        if (file) {
            try {
                const imgData = await imageUpload(file);
                if (imgData) {
                    await createUser(data.email, data.password)
                        .then(async (res) => {
                            setUser(res.user);
                            await handleUpdateProfile(data.name, imgData, phone);
                            const userData = {
                                name: data.name,
                                email: data.email,
                                image: imgData,
                                phone: phone
                            }
                            await mutateAsync(userData)
                            reset();
                            toast.success('Successfully Registered!');
                            navigate('/');
                        })
                        .catch((err) => {
                            toast.error(err.message);
                        });
                }
            } catch (error) {
                toast.error("Image upload failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle Google Signin
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async(res) => {
                setUser(res.user)
                await mutateAsync(
                    {
                        name: res?.user?.displayName,
                        email: res?.user?.email,
                        photo: res?.user?.photoURL,
                    }
                )
                toast.success('Successfully logged in!')
                navigate(from, { replace: true })
            })
            .catch(err => {
                toast.error(err?.message)
                setUser(null)
            })
    }
    return (
        <Container>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 bg-gradient-to-r from-[#95D3A2] to-[#36A0AD] h-[260px] sm:h-[400px] md:h-[870px] lg:h-[820px]  flex flex-col items-center justify-center md:justify-normal relative md:pt-20 lg:pt-10'>
                    <img className='w-[30%] md:w-[70%] lg:w-[50%] h-fit animate-pulse z-10' src={image} alt="" />
                    <img className='absolute left-[120px] sm:left-[200px] md:left-10 lg:left-[105px] top-[40px] sm:top-20 md:top-[36px] lg:top-0 w-[30%] md:w-[70%] lg:w-[60%] h-fit' src={image2} alt="" />
                    <h1 className='text-white text-center text-2xl sm:text-3xl lg:text-[40px] font-bold w-[90%] sm:w-[70%] md:w-[90%] lg:w-[70%] leading-none mt-2 sm:mt-0 mb-2 sm:mb-3'>Turn your ambition into a success history</h1>
                    <p className='text-sm sm:text-base text-white text-center'>Choose from over 50+ online courses</p>
                </div>
                {/* right side */}
                <div className="w-full md:w-1/2 mt-8 md:mt-5 px-5 sm:px-10 md:pl-8 lg:px-20 flex flex-col justify-center items-center sm:justify-start sm:items-start mb-5 md:mb-0">
                    <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold mb-2 text-gray-800">Create your free account!</h2>
                    <p className="text-gray-500 mb-4 text-center md:text-left md:text-lg">See how the world's best user experiences are created.</p>
                    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                        {/* Name Field */}
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-base md:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#66BE80] placeholder:text-gray-300 placeholder:font-normal"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        {/* imgbb */}
                        <div className='mb-4 w-full'>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                type="file"
                                id='image'
                                accept='image/*'
                                className="focus:ring-2 focus:ring-[#66BE80] file-input file-input-bordered w-full"
                                onChange={(e) => setValue('image', e.target.files[0])}
                                required
                            />
                        </div>


                        {/* Email Field */}
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-base md:text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#66BE80] placeholder:text-gray-300 placeholder:font-normal"
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

                        {/* Password Field */}
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-base md:text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#66BE80] placeholder:text-gray-300 placeholder:font-normal"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    maxLength: { value: 20, message: "Password must be less than 20 characters" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: "Password must have at least one uppercase, one lowercase, one number and one special character." }
                                })}
                            />
                            <span className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoMdEye className='text-lg' /> : <IoMdEyeOff className='text-lg' />}
                            </span>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                        {/* Phone Number Field */}
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-base md:text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                id="phoneNumber"
                                type="number"
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#66BE80] placeholder:text-gray-300 placeholder:font-normal"
                                {...register("phoneNumber", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{0,4}$/,
                                        message: "Phone number must be 4 digits"
                                    }
                                })}
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button type='submit' className="text-white rounded-[5px] bg-gradient-to-r from-[#66BE80] to-[#139196] font-medium hover:bg-gradient-to-r hover:from-[#139196] hover:to-[#139196] cursor-pointer w-full py-2 flex justify-center items-center duration-1000 ease-in-out transition-all">
                            {loading ? (
                                <p className="flex items-center gap-2">Please wait...<ImSpinner9 className='animate-spin m-auto text-sm' /></p>
                            ) : (
                                'Sign Up'
                            )}
                        </button>

                        {/* Divider */}
                        <div className="divider">OR</div>
                    </form>
                    {/* Google Sign-In */}
                    <button onClick={handleGoogleSignIn} className="w-full py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-2">
                        <FcGoogle className='text-2xl' /> Sign up with Google
                    </button>

                    {/* Redirect to Login */}
                    <p className='mt-5 text-center'>Already have an account? <Link className='text-[#30A18E]' to={'/login'}>Login</Link></p>
                </div>
            </div>
        </Container>
    );
};

export default SignUp;