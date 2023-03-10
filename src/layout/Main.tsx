import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../component/context/AuthProvider/AuthProvider';
import Nav from '../component/Nav';

const Main = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='bg-gray-900 min-h-screen p-4'>
            <Nav></Nav>
            <div className='min-h-screen'>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;