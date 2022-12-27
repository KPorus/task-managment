import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../component/Nav';

const Main = () => {
    return (
        <div className='bg-gray-900'>
            <Nav></Nav>
            <div className='min-h-screen'>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;