import React, { Suspense } from 'react';
import Slider from '../../Components/Slider/Slider';
import Loader from '../../Components/Laoder/Loader';
import WhyChose from '../../Components/WhyChose/WhyChose';

const Home = () => {
    return (
        <div>
            <Suspense fallback={<Loader></Loader>}>
                <Slider></Slider>
            </Suspense>
            <Suspense>
                <WhyChose></WhyChose>
            </Suspense>
        </div>
    );
};

export default Home;