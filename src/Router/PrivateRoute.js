import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../component/context/AuthProvider/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user, loading, setLoading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return setLoading(false)
    }
    
    if(user && user.uid){
       
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
    
};

export default PrivateRoute;