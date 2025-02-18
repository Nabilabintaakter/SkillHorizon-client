import React from 'react';
import { Zoom } from "react-awesome-reveal";

const Heading = ({ subtitle, title }) => {
    return (
        <Zoom triggerOnce>
            <div className='text-center mb-8 md:mb-12'>
                <p className='text-[#0886A0] dark:text-[#66BE80] mb-3 font-medium'>{subtitle}</p>
                <h1 className='text-black dark:text-white text-2xl md:text-3xl lg:text-4xl font-bold w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto'>{title}</h1>
            </div>
        </Zoom>
    );
};

export default Heading;
