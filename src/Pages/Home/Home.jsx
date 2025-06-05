import React, { Suspense } from 'react';
import Slider from '../../Components/Slider/Slider';
import Loader from '../../Components/Laoder/Loader';

const Home = () => {
    return (
        <div>
            <Suspense fallback={<Loader></Loader>}>
                <Slider></Slider>
            </Suspense>
        </div>
    );
};

export default Home;