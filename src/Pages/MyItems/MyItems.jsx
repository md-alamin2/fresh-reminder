import React, { Suspense } from 'react';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Components/Laoder/Loader';
import MyItemList from '../../Components/MyItemList/MyItemList';
import useFoodApi from '../../Apis/useFoodApi';

const MyItems = () => {
    const {user} = useAuth();
    const {myItemsPromise} = useFoodApi()
    return (
        <div className='w-11/12 lg:container mx-auto mt-20'>
            <h2 className='text-5xl font-bold text-center'>My Added Items</h2>
            <Suspense>
                <MyItemList myItemsPromise={myItemsPromise(user.email)}></MyItemList>
            </Suspense>
        </div>
    );
};

export default MyItems;