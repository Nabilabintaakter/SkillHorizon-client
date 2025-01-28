import { Slide } from 'react-awesome-reveal';
import reviews from '../../../assets/reviews.png';
import Container from '../../../Shared/Container/Container';
import ReviewSlider from './REviewSlider';


const Reviews = () => {
    return (
        <div className="mb-12 md:mb-16 lg:mb-20 ">
            <Container>
                <div className='flex flex-col md:flex-row gap-0 md:gap-10'>
                    {/* left section */}
                    <div className='md:w-1/2 flex justify-center items-center'><img className='w-[70%] sm:w-[90%] md:w-full md:h-[400px] lg:h-[550px] object-cover' src={reviews} alt="" /></div>
                    {/* right section */}
                    <div className='md:w-1/2 mt-0 md:mt-8 lg:mt-12'>
                        <div>
                            <div className='text-black text-2xl lg:text-4xl font-bold w-full mx-auto flex flex-col items-center'>
                                <h1 className=''>Our Students are Our Pride.</h1>
                                <h1>See What They Say About Us</h1>
                            </div>
                            <div className='mt-6 bg-white rounded-t-[40px] rounded-br-[40px] shadow-lg'>
                                <Slide direction='right' triggerOnce>
                                    <ReviewSlider></ReviewSlider>
                                </Slide>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Reviews;