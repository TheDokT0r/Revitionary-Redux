import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../api/firebase';
import { NavLink, useNavigate } from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                // ...
                console.log("uid", uid)
            } else {
                console.log("user isn't logged out")
                navigate('/login');
            }
        });

    }, [])

    return (
        <div>
            <h1>Welcome to Revitionary!</h1>
        </div>
    )
}
