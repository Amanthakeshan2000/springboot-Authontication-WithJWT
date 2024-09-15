import React, { useState } from 'react';
import '../Css/login.css';
import NSBM from '../Assets/nsbm.png';
import Logo from '../Assets/Login-Logo.png';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8082/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed. Please check your email and password.');
                return;
            }

            const data = await response.json();
            console.log(data);

            // Save token to local storage
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }

          
            navigate("/StudentDashboard");
        } catch (error) {
            console.error('Error during login:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const goToNewPage = () => {
        navigate("/Password_Confirm");
    };

    return (
        <div className='Login-Page' style={{ position: 'fixed' }}>
            <div className='Login-image-side'>
                <img src={NSBM} alt='' className='Login-Image' />
                <img src={Logo} alt='' className='Login-Logo' />
            </div>

            <div className='Login-Details-Side'>
                <div className='Login-Details'>
                    <h3 className='welcome'>Welcome!</h3>
                    <h3 className='Login-Description'>Please Login to Your Account</h3>

                    <div className='Inputs-and-Lables'>
                        <h5 className='Email-Password'>Email</h5>
                        <input
                            type='email'
                            placeholder='Johndec@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br /><br />
                        <h5 className='Email-Password'>Password</h5>
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <br />
                    {/* <div>
                        <h5 className='Login-Remember'>Remember Me</h5>
                    </div> */}
                    <br />
                    <button className='Login-Button' onClick={handleLogin}>Login</button>

                    {/* Display the error message */}
                    {error && (
                        <div className='Login-Error'>
                            <p>{error}</p>
                        </div>
                    )}

                    <br /><br /><br />

                    <h5 className='Register-Description'>If You Don't Have an Account, Please Register Here</h5>

                    <br />

                    <button className='Register-button' onClick={goToNewPage}>Register Account</button>
                </div>
            </div>
        </div>
    );
}
