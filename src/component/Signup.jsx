import React, { useState } from 'react'
import './Login.css'

import { Link } from 'react-router-dom'
import axios from 'axios'
import {BASE_URL }from "../config"
import Swal from 'sweetalert2'

const Signup = () => {

    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const signup = (event) => {
        event.preventDefault();

        setLoading(true);
        const requestData = { fullname, email, password }
        console.log(requestData);
        debugger
        axios.post(`${BASE_URL}/register`, requestData)
            .then((result) => {
                debugger
                if (result.status === 201) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully registered'
                    })
                }
                setFullName('');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred please try again later!'
                })
            })
    }
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
                    <img alt="social" className='socialDesktop' style={{ height: '85%' }} src="Twitter.png" />
                    <img alt="social" className='socialMobile' src="Twitter.png" />
                </div>
                <div className="col-md-5 col-sm-12">
                    <div className="card shadow">
                        {loading ? <div className='col-md-12 mt-3 text-center'>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : ''}
                        <div className="card-body px-5">
                            <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
                            <form onSubmit={(e) => signup(e)}>
                                <input type="text" className="p-2 mt-4 mb-2 form-control input-bg" placeholder='Phone' />
                                <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="p-2 mb-2 form-control input-bg" placeholder='Email' />
                                <input type="text" value={fullname} onChange={(ev) => setFullName(ev.target.value)} className="p-2 mb-2 form-control input-bg" placeholder='Full Name' />
                                <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="p-2 mb-2 form-control input-bg" placeholder='Password' />
                                <div className='mt-3 d-grid'>
                                    <button className="custom-btn custom-btn-blue" type='submit'>Sign Up</button>
                                </div>
                                <div className='my-4'>
                                    <hr className='text-muted' />
                                    <h5 className='text-muted text-center'>OR</h5>
                                    <hr className='text-muted' />
                                </div>
                                <div className='mt-3 mb-5 d-grid'>
                                    <button className="custom-btn custom-btn-white">
                                        <span className='text-muted fs-6'>Already have an account?</span>
                                        <Link to="/login" className='ms-1 text-info fw-bold'>Log In</Link>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup