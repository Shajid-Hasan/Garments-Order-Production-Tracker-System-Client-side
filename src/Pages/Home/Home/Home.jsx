import React from 'react';
import Hero from './Hero/Hero';
import ProductSection from './Hero/ProductSection';
import HowItWorks from './Hero/HowItsWorks';
import CustomerReview from './CustomerReview';

const Home = () => {
    return (
        <div>
            <Hero/>
            <ProductSection/>
            <HowItWorks/>
            <CustomerReview/>
        </div>
    );
};

export default Home;