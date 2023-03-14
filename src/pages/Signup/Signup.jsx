import React, { useState } from 'react';
import { auth, firestore } from '../../api/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { NavLink, useNavigate } from 'react-router-dom'
import { getDatabase, ref, set } from "firebase/database";
import genPfp from '../../api/genPfp';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';


export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [isLoading, setIsLoading] = useState(false);

    const createUserData = (email, uid) => {
        const data = {
            uid: uid,
            username: "vanilla",
            profilePicture: null,
            isOnline: true,
            registeredAt: new Date(),
            lastSeen: new Date(),
            friends: [],
            friendRequests: [],
            friendRequestsSent: [],
            revitionsCreated: [],
            revitionsPlayed: [],
            winStreak: 0,
            secodnsPlayed: 0,
            gamesPlayed: 0,
            gamesWon: 0,
        }

        firestore.collection('users').doc(email).set(data)
            .then(() => {
                console.log('User data created successfully!');
            })
            .catch((error) => {
                console.error('Error creating user data: ', error);
            });
    }

    const writeUserData = async (email, uid) => {
        const userData = {
            email: email,
            uid: uid,
            username: username,
            profilePicture: null,
            isOnline: true,
            registeredAt: new Date(),
            lastSeen: new Date(),
            friends: [],
            friendRequests: [],
            friendRequestsSent: [],
            revitionsCreated: [],
            revitionsPlayed: [],
            winStreak: 0,
            secodnsPlayed: 0,
            gamesPlayed: 0,
            gamesWon: 0,
        }

        try {
            const db = firestore;

            const docRef = await addDoc(collection(db, "users"), userData);
            console.log('Done!');
        }
        catch (e) {
            console.log(e);
        }

    }

    const signupHandeler = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (password !== passwordConfirm) {
            alert("Passwords don't match");
            return;
        }

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...

                // createUserData(email, user.uid);
                writeUserData(email, user.uid);
                
                genPfp(username);

                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });

        setIsLoading(false);
    }


    if(isLoading) {
        return <LoadingScreen text={'Creating account...'}/>
    }

    return (
        <div>
            <div>
                <h1>Signup</h1>

                <form>
                    <div>
                        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div>
                        <input type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                    </div>

                </form>
            </div>
            <button onClick={signupHandeler} type="submit">Signup</button>
        </div >
    )
}
