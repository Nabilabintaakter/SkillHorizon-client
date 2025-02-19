import React from 'react';
import OverviewCalendar from './OverviewCalendar';
import { Zoom } from 'react-awesome-reveal';

const Overview = () => {
    return (
        <div className='bg-[#FAFBFD] dark:bg-[#282834] min-h-screen container mx-auto w-full px-4'>
            <Zoom triggerOnce>
                <div className="text-center py-8">
                    <h1 className='text-black dark:text-white text-2xl mb-3 md:text-3xl lg:text-4xl font-bold w-full mx-auto'>Overview your informations</h1>
                    <p className='text-[#0886A0]  font-medium'>Your Personalized Profile Overview</p>
                </div>
            </Zoom>
            <OverviewCalendar></OverviewCalendar>
        </div>
    );
};

export default Overview;