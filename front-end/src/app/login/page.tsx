"use client"

import Axios from '@/Utils/Axios'
import React, { useState } from 'react'


const Loginpage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const res = await Axios.post('/users/login', {
                "username": username,
                "password": password
            });
            const token = res.data.token;

            // Save the token in localStorage
            localStorage.setItem('authToken', token);

            console.log('Login successful:', res.data);
            window.location.href = '/dashboard';

            // Optionally, redirect the user to a protected route
            // window.location.href = '/dashboard';

        } catch (err) {
            console.error('Login failed:', err);
        }


    }


    return (
        <div className='bg-[#F8D247] h-screen flex justify-center place-items-center'>
            <div className='bg-white h-[70vh] w-[70vw] rounded-[40px] shadow-2xl'>
                <div className='flex flex-col justify-center h-full gap-12  w-[742px]'>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center h-full ml-[10vw] gap-12 w-[742px]'>
                        <h1 className='text-[40px] font-bold'>
                            Log In
                        </h1>

                        <div className="relative">
                            <label
                                htmlFor="email"
                                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#808080]"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="block w-full h-[50px] rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#808080]"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="block w-full h-[50px] rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className='w-full rounded-lg bg-[#F8D247] py-2 border-black border' type='submit'>
                            Log In
                        </button>
                    </form>

                </div>


            </div>
        </div>
    )
}

export default Loginpage