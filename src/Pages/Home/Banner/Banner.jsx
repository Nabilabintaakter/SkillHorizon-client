import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import banner from '../../../assets/banner-3.jpeg'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Container from '../../../Shared/Container/Container';
import { RiRewindStartMiniFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import person1 from '../../../assets/istockphoto-1438969575-612x612.jpg'
import person2 from '../../../assets/person2.webp'
import person3 from '../../../assets/person3.jpg'
import { FaArrowRight } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

export default function Banner() {
    const axiosPublic = useAxiosPublic();
    // Total users
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/users`);
            return data;
        },
    });
    return (
        <div className='relative h-[790px] md:h-[500px] bg-gradient-to-r from-[#95D3A2] to-[#36A0AD]'>
            <Container>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {/* slide-1 */}
                    <SwiperSlide>
                        <div className=' flex flex-col gap-8 md:flex-row justify-between items-center py-14'>
                            <div className='flex flex-col justify-center items-center md:items-start w-full md:w-1/2 text-white dark:text-black space-y-4'>
                                <h1 className='text-center md:text-left text-3xl md:text-4xl lg:text-5xl xl:text-[52px] font-bold '>Unlock Your Potential with Expert-Led Online Courses</h1>
                                <p className='text-center md:text-left xl:text-lg'>Discover a wide range of <span className='text-[#FEC400]'>high-quality</span> courses designed to enhance your <span className='text-[#FEC400]'>skills</span> and knowledge. Join thousands of learners worldwide and grow with new content added regularly!</p>
                                <Link to={'/allClasses'} className=' text-black rounded-[5px] bg-[#F0BF79] font-medium hover:text-[#39A2AD] cursor-pointer px-5 py-2 md:py-[14px] flex gap-2 items-center'>Get Started Today <RiRewindStartMiniFill className='text-2xl font-bold' /></Link>
                                <div className='flex items-center gap-4'>
                                    <div className="avatar-group -space-x-4">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-[1px] ring-white">
                                                <img src={person1} alt="Avatar 1" />
                                            </div>
                                        </div>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-[1px] ring-white">
                                                <img src={person3} alt="Avatar 2" />
                                            </div>
                                        </div>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-[1px] ring-white">
                                                <img src={person2} alt="Avatar 3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm md:text-lg flex items-center gap-1">
                                    {users?.length-1}+ People already trusted us. <Link className='items-center hidden md:flex gap-1 text-[#FEC400]' to={'/allClasses'}>
                                            View Courses <FaArrowRight /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className=' w-full md:w-1/2  flex justify-center'><img className='relative z-10 object-cover w-[300px] h-[390px] rounded-3xl shadow-2xl' src={banner} alt="" />
                                <div className='absolute border-[2px] border-[#95D3A2] w-[300px] h-[390px] rounded-[28px] right-6  bottom-6 sm:right-40  md:right-1 lg:right-10 md:top-[85px] xl:right-32 xl:top-[87px]'></div>
                            </div>
                        </div>
                    </SwiperSlide>
                    {/* slide-2 */}
                    <SwiperSlide>
                        <div className=' flex flex-col gap-8 md:flex-row justify-between items-center py-14'>
                            <div className='flex flex-col justify-center items-center md:items-start w-full md:w-1/2 text-white dark:text-black space-y-4'>
                                <h1 className='text-center md:text-left text-3xl md:text-4xl lg:text-5xl xl:text-[52px] font-bold '>Master the Skills to Shape Your Future</h1>
                                <p className='text-center md:text-left xl:text-lg'>Explore expertly curated <span className='text-[#FEC400]'>courses</span> across diverse fields. Build your <span className='text-[#FEC400]'>career</span> and personal growth with guidance from top educators worldwide!</p>
                                <Link to={'/allClasses'} className=' text-black rounded-[5px] bg-[#F0BF79] font-medium hover:text-[#39A2AD]  cursor-pointer px-5 py-2 md:py-[14px] flex gap-2 items-center'>Explore Courses <RiRewindStartMiniFill className='text-2xl font-bold' /></Link>
                                <div className='flex items-center gap-4'>
                                    <div className="avatar-group -space-x-4">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-[1px] ring-white">
                                                <img src={person1} alt="Avatar 1" />
                                            </div>
                                        </div>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-[1px] ring-white">
                                                <img src={person3} alt="Avatar 2" />
                                            </div>
                                        </div>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-[1px] ring-white">
                                                <img src={person2} alt="Avatar 3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm md:text-lg flex items-center gap-1">
                                    {users?.length-1}+ People already trusted us. <Link className='hidden md:flex items-center gap-1 text-[#FEC400]' to={'/allClasses'}>
                                            View Courses <FaArrowRight /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className=' w-full md:w-1/2  flex justify-center'><img className='relative z-10 object-cover w-[300px] h-[390px] rounded-3xl shadow-2xl' src={banner} alt="" />
                                <div className='absolute border-[2px] border-[#95D3A2] w-[300px] h-[390px] rounded-[28px] right-6  bottom-6 sm:right-40  md:right-1 lg:right-10 md:top-[85px] xl:right-32 xl:top-[87px]'></div>
                            </div>
                        </div>
                    </SwiperSlide>
                    {/* slide-3 */}
                    <SwiperSlide>
                        <div className=' flex flex-col gap-8 md:flex-row justify-between items-center py-14'>
                            <div className='flex flex-col justify-center items-center md:items-start w-full md:w-1/2 text-white dark:text-black space-y-4'>
                                <h1 className='text-center md:text-left text-3xl md:text-4xl lg:text-5xl xl:text-[52px] font-bold '>Learn Anytime, Anywhere at Your Pace</h1>
                                <p className='text-center md:text-left xl:text-lg'>Access a library of online <span className='text-[#FEC400]'>courses</span> tailored to your goals. Achieve your <span className='text-[#FEC400]'>dreams</span> with flexible learning opportunities and interactive lessons!</p>
                                <Link to={'/allClasses'} className=' text-black rounded-[5px] bg-[#F0BF79] font-medium hover:text-[#39A2AD]  cursor-pointer px-5 py-2 md:py-[14px] flex gap-2 items-center'>Start Learning Now <RiRewindStartMiniFill className='text-2xl font-bold' /></Link>
                                <div className='flex items-center gap-4'>
                                    <div className="avatar-group -space-x-4">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-[1px] ring-white">
                                                <img src={person1} alt="Avatar 1" />
                                            </div>
                                        </div>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-[1px] ring-white">
                                                <img src={person3} alt="Avatar 2" />
                                            </div>
                                        </div>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring-[1px] ring-white">
                                                <img src={person2} alt="Avatar 3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm md:text-lg flex items-center gap-1">
                                    {users?.length-1}+ People already trusted us. <Link className='hidden md:flex items-center gap-1 text-[#FEC400]' to={'/allClasses'}>
                                            View Courses <FaArrowRight /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className=' w-full md:w-1/2  flex justify-center'><img className='relative z-10 object-cover w-[300px] h-[390px] rounded-3xl shadow-2xl' src={banner} alt="" />
                                <div className='absolute border-[2px] border-[#95D3A2] w-[300px] h-[390px] rounded-[28px] right-6  bottom-6 sm:right-40  md:right-1 lg:right-10 md:top-[85px] xl:right-32 xl:top-[87px]'></div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </Container>
        </div>
    );
}
