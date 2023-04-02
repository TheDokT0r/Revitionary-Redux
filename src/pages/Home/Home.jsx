import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Home.module.scss';
import classNames from 'classnames';
import Navbar from '../../components/Navbar';
import verifyConnection from '../../api/UserMannagement/verifyConnection';
import getUid from '../../api/UserMannagement/getUid';

//mui stuff
import { ButtonGroup, Button } from '@mui/material';

const cx = classNames.bind(styles);

export default function Home() {
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);

    const fetchUid = async () => {
        const uid = await getUid();

        if (!uid) {
            console.log('no uid')
            navigate('/login');
        }

        setUserID(uid);
    }

    useEffect(() => {
        fetchUid();
    }, [])


    //In a rare case where the uid fetching fails and returns null, even though the session token is valid
    if (!userID) {
        fetchUid();
    }


    return (
        <>
            <Navbar uid={userID} />
            <div className={styles.page}>
                <div className={styles.center}>
                    <h1>Welcome to Revitionary!</h1>
                    <footer className={styles.version_name}>Version 0.1 - Hootka</footer>
                </div>
                {/* <div>
                    <Link to={`users/${userID}/profile`}><button>Profile</button></Link>
                    
                    <Link to='/rev/browse'><button>Browse Revitions</button></Link>
                </div> */}

                <div>
                    <ButtonGroup
                        color='primary'
                        variant="contained"
                        aria-label="outlined primary button group"
                        orientation='vertical'>
                        <Button
                            onClick={() => navigate('/rev/browse')}
                            className={cx(styles.revise_btn,
                                styles.btn)}>
                            Start Revising!</Button>
                        <Button
                            onClick={() => navigate(`users/${userID}/profile`)}
                            className={styles.profile_btn}>
                            Profile</Button>
                    </ButtonGroup>
                </div>
            </div >
        </>
    )
}
