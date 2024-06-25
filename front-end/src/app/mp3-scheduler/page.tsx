"use client"

import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { FileType } from './types';
import Axios from '@/Utils/Axios';
import { isAuthenticated } from '@/Utils/Auth';


const page = () => {

    const [file, setFile] = useState<File | null>(null);
    const [uploadTime, setUploadTime] = useState('');
    // const [duration, setDuration] = useState(0); // duration in seconds
    const [filesList, setFilesList] = useState<{ file: null | File; uploadTime: string; uploadEndTime: string; duration: number; }[]>([]);
    const [uploads, setUploads] = useState([]);
    const [message, setMessage] = useState('');

    const handleAddFile = async () => {
        if (!file) {
            setMessage('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('mp3', file);

        try {
            // Make API call to get file duration
            const response = await Axios.post('/get-duration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { duration } = response.data.minute;
            console.log('Duration:', response.data.minute, response.data.second);
            const startTime = dayjs(uploadTime); // Assuming uploadTime is set elsewhere

            // Check for overlapping times
            for (const item of filesList) {
                const endTime = dayjs(item.uploadEndTime); // Convert to dayjs object

                if (
                    dayjs(item.uploadEndTime).isAfter(startTime) &&
                    startTime.isBefore(endTime)
                ) {
                    setMessage('Upload time overlaps with an existing upload');
                    return;
                }
            }

            let endTime = startTime.add(response.data.minute, 'minute'); // Calculate end time based on duration
            endTime = endTime.add(response.data.second, 'second');
            console.log('Start time:', startTime.toISOString());
            console.log('End time:', endTime.toISOString());

            const newFile = {
                file,
                uploadTime: startTime.toISOString(),
                uploadEndTime: endTime.toISOString(),
                duration,
            };

            setFilesList([...filesList, newFile]);
            setMessage('File added to list');
            setFile(null);
        } catch (error) {
            console.error('Error adding file:', error);
            setMessage('Failed to add file');
        }
    };

    const checkAuth = async () => {
        const auth = await isAuthenticated();
        if (!auth) {
            window.location.href = '/login';
        }
    }

    const handleUpload = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Authorization token not found');
            }
            for (const item of filesList) {
                const formData = new FormData();
                if (item.file && item.uploadTime) {
                    formData.append('mp3', item.file); // Assuming 'mp3' is the key expected by your backend for the file
                    formData.append('uploadTime', item.uploadTime); // Assuming 'uploadTime' and 'duration' are correctly formatted
                }

                console.log(formData)

                const res = await Axios.post('/upload-mp3', formData, {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  });

                console.log('Upload response:', res.data);
            }
            setMessage('All files uploaded successfully');
            setFilesList([]);
            // fetchUploads(); // Refresh the list after uploading
        } catch (error) {
            console.error('Error uploading files:', error);
            setMessage('Failed to upload files');
        }
    };

    useEffect(() => {
        checkAuth()
    })


    return (
        <div className='flex flex-col items-center gap-6'>
            <h1 className=' text-lg'>Upload MP3</h1>
            <div className='flex justify-center'>
                <input
                    type="file"
                    accept="audio/mpeg"
                    onChange={(e) => e.target.files && setFile(e.target.files[0])}
                />
                <input
                    type="datetime-local"
                    value={uploadTime}
                    onChange={(e) => setUploadTime(e.target.value)}
                />

                <button onClick={handleAddFile}>Add to List</button>
                <button onClick={handleUpload}>Upload All</button>
            </div>



            <div className='flex flex-col items-center gap-4'>
                {message && <p >{message}</p>}
                <h2 >Files to be uploaded</h2>
                <ul className='flex flex-col items-center gap-4 py-4'>
                    {filesList.map((item, index) => (
                        <li key={index} className='flex gap-4  justify-center border-2 border-black rounded-lg w-fit px-4 py-4'>

                            <div >
                                {`File Name : ${item.file?.name} , Start Time: ${dayjs(item.uploadTime).format('HH:mm:ss')}, End Time: ${dayjs(item.uploadEndTime).format('HH:mm:ss')}`}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default page