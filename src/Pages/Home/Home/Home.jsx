import React from 'react';
import Banner from '../Banner/Banner';
import Collaborators from '../Collaborators/Collaborators';
import StatsSection from '../StatsSection/StatsSection';
import JoinAsInstructor from '../JoinAsInstructor/JoinAsInstructor';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Collaborators></Collaborators>
            <StatsSection></StatsSection>
            <JoinAsInstructor></JoinAsInstructor>
        </div>
    );
};

export default Home;