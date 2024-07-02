import React, { useState } from 'react';
import axios from 'axios';

import './Login.css';

function Login({setCurrent, setUname}) {
    const [message, setMessage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        const user = {
            username: data.get('username'),
            password: data.get('password')
        };
        axios.post('http://localhost:8000/token/', user, 
            {headers: {
                'Content-Type': 'application/json'
            },withCredentials: true}
        ).then(response => {
            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;

                setMessage('Login Successful');
                setUname(data.get('username'));
                setCurrent('home');
            }
            else {
                setMessage('Invalid Credentials');
            };
        }
        ).catch(error => {
            setMessage('Login Failed')
            console.log(error);
        });
    }

    return (
        <>
            <div id="login" className="logform">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" placeholder="Username" />
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" placeholder="Password" />
                    <button>Login</button>
                </form>
            {message!=='' && <p>{message}</p>}
            </div>
        </>
    );
}

export default Login;