import React, { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../../../firebase/firebase.config"
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie/cjs/Cookies';

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    let googleLogin = (provider)=>
    {
        setLoading(true)
        return signInWithPopup(auth,provider)
    }

    let usersignOut = ()=>
    {
        return signOut(auth)
    }

    let createUser = (email, password) =>
    {
         setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
      }

    const forgetPassword =(email)=>
    {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            if(currentUser === null || currentUser.emailVerified){
                setUser(currentUser);
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }

    }, [])

    

    const authInfo = { user, googleLogin, usersignOut, createUser , setLoading, login, setUser, forgetPassword ,loading}
    return ( 
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;