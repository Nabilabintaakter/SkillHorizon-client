import React from 'react';
import Banner from '../Banner/Banner';
import Collaborators from '../Collaborators/Collaborators';
import StatsSection from '../StatsSection/StatsSection';
import JoinAsInstructor from '../JoinAsInstructor/JoinAsInstructor';
import Categories from '../Categories/Categories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Collaborators></Collaborators>
            <StatsSection></StatsSection>
            <Categories></Categories>
            <JoinAsInstructor></JoinAsInstructor>
        </div>
    );
};

export default Home;