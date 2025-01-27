import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaStar, FaRegStar } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';

const ReviewSlider = () => {
    const axiosPublic = useAxiosPublic();
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/reviews`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) =>
            index < rating ? (
                <FaStar key={index} className="text-yellow-500" />
            ) : (
                <FaRegStar key={index} className="text-gray-300" />
            )
        );
    };

    return (
        <div className="">
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                        <div className="text-center  w-full h-[370px] sm:h-[320px] md:h-[410px] lg:h-[320px] px-5 pb-9 flex flex-col justify-center">
                            <img
                                src={review.studentImage}
                                alt={review.studentName}
                                className="w-16 h-16 mx-auto rounded-full border-2 border-gray-200 mb-2 object-cover"
                            />
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                                {review.studentName}
                            </h3>
                            <p className="text-sm md:text-base text-[#219892] italic mb-3">
                                {review.classTitle}
                            </p>
                            <div className="flex justify-center gap-1 mb-4">
                                {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-500 text-sm leading-normal lg:leading-relaxed mb-5">
                                "{review.comments}"
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReviewSlider;
