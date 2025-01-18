import React from 'react';

const Heading = ({subtitle, title}) => {
    return (
        <div className='text-center mb-8 md:mb-12'>
            <p className='text-[#0886A0] mb-3 font-medium'>{subtitle}</p>
            <h1 className='text-black text-2xl md:text-3xl lg:text-4xl font-bold w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto'>{title}</h1>
        </div>
    );
};

export default Heading;