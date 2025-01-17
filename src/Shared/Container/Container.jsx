import React from 'react';

const Container = ({children}) => {
    return (
        <div className='w-[95%] md:w-[93%] max-w-7xl mx-auto'>
            {children}
        </div>
    );
};

export default Container;