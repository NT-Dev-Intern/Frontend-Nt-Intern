"use client"

import Axios from '@/Utils/Axios'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [playlist, setPlaylist] = useState([])

    const handlepreviewtrack = (id: number) => {
        window.location.href = `/mp3-scheduler/${id}`;
    }

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                throw new Error('Authorization token not found');
            }

            const res = await Axios.get("/get-playlists", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(res.data)
            setPlaylist(res.data)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
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
                            <h2 className="text-lg font-semibold text-gray-900">Your Playlist</h2>

                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {playlist.map((track: any) =>
                                <button onClick={() => handlepreviewtrack(track.id)} className="bg-gray-50 p-4 rounded-lg shadow-lg transition ease-in-out delay-150 hover:text-white  hover:-translate-y-1 hover:scale-110 hover:bg-gray-800 duration-300 ">

                                    <h3 className="text-lg font-semibold  ">{track.name}</h3>

                                </button>
                            )}


                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default page
