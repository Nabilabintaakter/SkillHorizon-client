import React from 'react';
import Banner from '../Banner/Banner';
import Collaborators from '../Collaborators/Collaborators';
import StatsSection from '../StatsSection/StatsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Collaborators></Collaborators>
            <StatsSection></StatsSection>
        </div>
    );
};

export default Home;