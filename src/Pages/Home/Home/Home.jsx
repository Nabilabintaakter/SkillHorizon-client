import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import Collaborators from '../Collaborators/Collaborators';
import StatsSection from '../StatsSection/StatsSection';
import JoinAsInstructor from '../JoinAsInstructor/JoinAsInstructor';
import Categories from '../Categories/Categories';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import Reviews from '../Reviews/Reviews';
import MostEnrolledCourses from '../MostEnrolledCourses/MostEnrolledCourses';

const Home = () => {
    useEffect(() => {
        document.title = 'Home | SkillHorizon';
    }, [])
    return (
        <div>
            <Banner></Banner>
            <Collaborators></Collaborators>
            <MostEnrolledCourses></MostEnrolledCourses>
            <StatsSection></StatsSection>
            <Categories></Categories>
            <FeaturesSection></FeaturesSection>
            <Reviews></Reviews>
            <JoinAsInstructor></JoinAsInstructor>
        </div>
    );
};

export default Home;