import React, { useState } from 'react';
import '../Css/confirm_password.css';
import NSBM from '../Assets/nsbm.png';
import Logo from '../Assets/Login-Logo.png';
import { useNavigate } from "react-router-dom";

export default function Password_Confirm() {
    const navigate = useNavigate();

    // State to store form data
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        email: '',
        address: '',
        password: ''
    });

    // State to store error or success messages
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset messages
        setErrorMessage('');
        setSuccessMessage('');

        // Basic form validation
        if (!formData.userId || !formData.userName || !formData.email || !formData.address || !formData.password) {
            setErrorMessage("All fields are required.");
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        // Password match validation
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        // Password length validation
        if (formData.password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }

        try {
            // Log form data for debugging
            console.log("Sending data:", {
                userId: parseInt(formData.userId),
                userName: formData.userName,
                email: formData.email,
                address: formData.address,
                password: formData.password
            });



            // API call to send form data
            const response = await fetch('http://localhost:8082/auth/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: parseInt(formData.userId),
                    userName: formData.userName,
                    email: formData.email,
                    address: formData.address,
                    password: formData.password
                })
            });

            const responseText = await response.text(); // Get the raw response text

            if (response.ok) {
                const responseData = JSON.parse(responseText); // Parse the response if it's successful
                console.log("API Success:", responseData);
                setSuccessMessage("User registered successfully!");
                setTimeout(() => navigate("/"), 2000); // Redirect to login page after 2 seconds
            } else {
                console.log("API Response Text (Error):", responseText); // Log the raw response if there's an error
                setErrorMessage(`Error: ${responseText}`);
            }
        } catch (error) {
            console.error("Error in fetch request:", error); // Log any fetch errors
            setErrorMessage("An error occurred while registering. Please try again.");
        }
    };

    const goToLogin = () => {
        navigate("/"); // Adjust this path based on your routes
    };

    return (
        <>
            <div className='Login-Page' style={{ position: 'fixed' }}>
                <div className='Login-image-side'>
                    <img src={NSBM} alt='' className='Login-Image' />
                    <img src={Logo} alt='' className='Login-Logo' />
                </div>

                <div className='Login-Details-Side'>
                    <div className='Login-Details'>
                        <h3 className='welcome'>Welcome!</h3>
                        <br />
                        <div className='Inputs-and-Lables'>
                            <h5 className='Password'>User Id (Student / Lecturer)</h5>
                            <input
                                type='text'
                                name='userId'
                                value={formData.userId}
                                onChange={handleInputChange}
                                placeholder='User ID'
                            />
                            <br /><br />
                            <h5 className='Password'>User Name</h5>
                            <input
                                type='text'
                                name='userName'
                                value={formData.userName}
                                onChange={handleInputChange}
                                placeholder='User Name'
                            />
                            <br /><br />
                            <h5 className='Password'>Email</h5>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder='E-Mail'
                            />
                            <br /><br />
                            <h5 className='Password'>Address</h5>
                            <input
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder='Address'
                            />
                            <br /><br />
                            <h5 className='Password'>Enter Password</h5>
                            <input
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder='Password'
                            />
                            <h3 className='Password-Description'>
                                Your password must be at least 8 characters long
                            </h3>
                            <br />
                            <h5 className='Password'>Confirm Password</h5>
                            <input
                                type='password'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder='Confirm Password'
                            />
                        </div>
                        <br />

                        {/* Display error or success message */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}

                        <button className='Login-Button' onClick={handleSubmit}>Register</button>
                        <br /><br />
                        <button className='Back-button' onClick={goToLogin}>Back</button>
                    </div>
                </div>
            </div>
        </>
    );
}
