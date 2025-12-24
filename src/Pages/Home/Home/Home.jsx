import React from 'react';
import Hero from '../Hero/Hero';
import ProductSection from '../Hero/ProductSection';
import HowItWorks from '../Hero/HowItsWorks';
import CustomerReview from '../Review/CustomerReview';
import Features from '../Hero/Features';
import Newsletter from '../Hero/Newsletter';

const Home = () => {
    return (
        <div>
            <Hero/>
            <ProductSection/>
            <HowItWorks/>
            <CustomerReview/>
            <Features />
            <Newsletter/>
        </div>
    );
};

export default Home;