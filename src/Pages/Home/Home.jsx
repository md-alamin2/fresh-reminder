import React, { Suspense } from 'react';
import Slider from '../../Components/Slider/Slider';
import Loader from '../../Components/Laoder/Loader';
import WhyChose from '../../Components/WhyChose/WhyChose';
import Tips from '../../Components/Tips/Tips';
import NearlyExpired from '../../Components/NearlyExpired/NearlyExpired';
import { useLoaderData } from 'react-router';

const Home = () => {
    const nearlyExpiredData = useLoaderData();
    return (
        <div>
            <Suspense fallback={<Loader></Loader>}>
                <Slider></Slider>
            </Suspense>
            <NearlyExpired nearlyExpiredData={nearlyExpiredData}></NearlyExpired>
            <Suspense fallback={<Loader></Loader>}>
                <WhyChose></WhyChose>
            </Suspense>
            <Suspense>
                <Tips></Tips>
            </Suspense>
        </div>
    );
};

export default Home;