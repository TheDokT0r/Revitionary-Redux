import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, NavLink } from 'react-router-dom'
import login from '../../api/UserMannagement/login'
import Navbar from '../../components/Navbar/Navbar'
import styles from './Login.module.scss'
import classNames from 'classnames/bind';
import axios from 'axios'
const cx = classNames.bind(styles);


export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false);

    const loginHandler = (e) => {
        e.preventDefault();

        console.log(`Email: ${email} Password: ${password}`);

        if (!email || !password) {
            return alert('Please fill in all fields!');
        }

        login(email, password, rememberMe).then((res) => {
            if (res.status === 200) {
                navigate('/');
            }
        }).catch((err) => {
            console.log(err)
            alert('Invalid credentials')
        });
    }


    return (
        <>
            <Navbar />
            <div className={styles.page}>
                <h1>Login</h1>

                <form className={cx(styles.login_form, styles.input)}>
                    <div>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                </form>

                <div className={styles.remember_me}>
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(!rememberMe)} />
                    <label>Remember me for 60 days</label>
                </div>

                <button
                    className={styles.submit_btn}
                    onClick={loginHandler}
                    type="submit">
                    Login</button>

                <Link to='/'>
                    <button
                        className={styles.back_btn}>
                        Back</button>
                </Link>

                <label
                    className={styles.footer}>
                    Don't have an account? <a href='/signup'>Create one today!</a></label>

            </div>
        </>
    )
}
