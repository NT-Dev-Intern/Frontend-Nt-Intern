// src/app/preview/[id]/page.tsx

'use client'; // Mark this file as a Client Component

import Axios from '@/Utils/Axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Preview = ({params} : {params : {id : number}}) => {
    
    const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        const getTracks = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const res = await Axios.get(`/get-tracks/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    responseType: 'blob' // Specify responseType as 'blob' for binary data
                });

                // Assuming res.data is a Blob object containing audio data
                const blob = new Blob([res.data], { type: 'audio/mpeg' });
                const url = URL.createObjectURL(blob);
                setAudioSrc(url);

            } catch (err) {
                console.error('Error fetching tracks:', err);
            }
        };

        if (params.id) {
            getTracks();
        }
    }, [params.id]); // Fetch whenever params.id changes

    return (
        <div className='h-screen flex justify-center items-center'>
            {audioSrc && (
                <audio controls>
                    <source src={audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default Preview;
