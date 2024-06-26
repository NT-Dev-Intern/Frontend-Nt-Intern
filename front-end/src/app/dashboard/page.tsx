"use client"

import { isAuthenticated } from '@/Utils/Auth'
import Axios from '@/Utils/Axios'
import React, { useEffect, useState } from 'react'
import { TrackData } from './types'

const Dashboard = () => {

    const [tracks, setTracks] = useState<TrackData[]>([])
    const [search, setSearch] = useState<TrackData[]>([])

    const getUserTracks = async () => {
        const token = localStorage.getItem('authToken');
        const res = await Axios.get('/get-user-tracks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setTracks(res.data.tracks);
        setSearch(res.data.tracks);
        console.log(tracks)
    }

    const handlePreview = (id: number) => {
        window.location.href = `/dashboard/${id}`;
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();

        const filtered = tracks && tracks.filter(track =>
            track.title.toLowerCase().indexOf(value) !== -1
        );
        setSearch(value !== '' ? filtered : tracks);
    };

    const checkAuth = async () => {
        const auth = await isAuthenticated();
        if (!auth) {
            window.location.href = '/login';
        }
    }
    
    useEffect(() => {
        checkAuth()
        getUserTracks();
    }, [])

    return (
        <div className=' h-screen '>
            <header className="py-10 bg-gray-800 pb-32 mb-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>

                </div>
            </header>
            <main className="-mt-32">
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white px-5 py-6 shadow-xl sm:px-6">
                        <div className='flex gap-6  justify-between'>
                            <h2 className="text-lg font-semibold text-gray-900">Your Tracks</h2>
                            <div>
                                <label htmlFor="search" className="block text-lg font-semibold leading-6 text-gray-900">
                                    Quick search
                                </label>
                                <div className="relative mt-2 flex items-center">
                                    <input
                                        type="text"
                                        name="search"
                                        onChange={handleSearch}
                                        id="search"
                                        className="block w-full rounded-md border-0 py-1.5 pr-14 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {search.map((track: any) =>
                                <button onClick={() => handlePreview(track.id)} className="bg-gray-50 p-4 rounded-lg shadow-lg transition ease-in-out delay-150 hover:text-white  hover:-translate-y-1 hover:scale-110 hover:bg-gray-800 duration-300 ">

                                    <h3 className="text-lg font-semibold  ">{track.title}</h3>
                                    <p className="mt-2 text-sm text-gray-500">{track.duration}</p>
                                </button>
                            )}


                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard