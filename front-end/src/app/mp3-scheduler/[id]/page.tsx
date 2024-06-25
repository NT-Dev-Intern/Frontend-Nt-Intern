"use client"

import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { FileType, UploadedData } from './types';
import Axios from '@/Utils/Axios';
import { isAuthenticated } from '@/Utils/Auth';


const page = ({ params }: { params: { id: number } }) => {

    const [file, setFile] = useState<File | null>(null);
    const [uploadTime, setUploadTime] = useState('');
    // const [duration, setDuration] = useState(0); // duration in seconds
    const [filesList, setFilesList] = useState<{ file: null | File; uploadTime: string; uploadEndTime: string; duration: number; }[]>([]);
    const [uploads, setUploads] = useState<UploadedData[]>([]);
    const [message, setMessage] = useState('No file Upload yet');

    const tracksData = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Authorization token not found');
        }
        try {
            const res = await Axios.get(`/get-playlist-tracks/${params.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res.data.tracks);
            setUploads(res.data.tracks);
        } catch (err) {

        }
    }

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
                    formData.append('playlistId', String(params.id)); // Assuming
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
            await tracksData()
            // fetchUploads(); // Refresh the list after uploading
        } catch (error) {
            console.error('Error uploading files:', error);
            setMessage('Failed to upload files');
        }
    };

    useEffect(() => {
        checkAuth()
        tracksData()
    }, [])


    return (
        <div className='flex flex-col items-center gap-12 py-6 h-fit'>
            <h1 className=' text-2xl'>Upload MP3</h1>
            <div className='flex justify-around items-center gap- w-full  '>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                <input
                    type="file"
                    id='file_input'
                    className="block  text-sm text-gray-500
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-neutral-500
        dark:file:bg-blue-500
        dark:hover:file:bg-blue-400"
                    accept="audio/mpeg"
                    onChange={(e) => e.target.files && setFile(e.target.files[0])}
                />
                <input
                    type="datetime-local"
                    value={uploadTime}
                    onChange={(e) => setUploadTime(e.target.value)}
                />
                {/* <input
                    type="time"
                    value={dayjs(uploadTime).format('HH:mm')}
                    onChange={(e) => setUploadTime(`${dayjs().format('YYYY-MM-DD')}T${e.target.value}`)}
                /> */}

                <button onClick={handleAddFile} className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add to List</button>
                <button onClick={handleUpload} className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload All</button>
            </div>



            <div className='grid grid-cols-2 gap-4 mx-[50px]'>
                <div className='col-start-1'>
                    {message && <p className='py-4'>{message}</p>}
                    <ul className='flex flex-col  gap-4 py-4'>
                        {filesList.length === 0 ?
                            <li className='flex gap-4 w-full border-2 border-black rounded-lg  px-4 py-4'>
                                <div className='flex justify-center'>
                                    <h1>No file Upload yet</h1>
                                </div>
                            </li>
                            :
                            <>
                                {filesList.map((item, index) => (
                                    <li key={index} className='flex gap-4 border-2 border-black rounded-lg w-[100%] px-4 py-6'>
                                        <div className='w-full'>
                                            <div className='flex justify-between w-full items-center text-indigo-600 font-semibold'>
                                                <p>
                                                    {dayjs(item.uploadEndTime).format('DD-MM-YYYY')}
                                                </p>
                                                <p>
                                                    {` ${dayjs(item.uploadTime).format('HH:mm:ss')} - ${dayjs(item.uploadEndTime).format('HH:mm:ss')}`}
                                                </p>

                                            </div><br />

                                            {`File Name : ${item.file?.name}`}<br />
                                            {/* {`Start Time: ${dayjs(item.uploadTime).format('DD-MM-YYYY HH:mm:ss')}`}<br />
                                            {`End Time: ${dayjs(item.uploadEndTime).format('DD-MM-YYYY HH:mm:ss')}`}<br /> */}
                                        </div>


                                    </li>
                                ))}
                            </>

                        }

                    </ul>
                </div>
                <div className='col-start-2'>
                    <h2 className='py-4'>Files uploaded</h2>
                    <ul className='flex flex-col  gap-4 py-4'>

                        {uploads.sort((a, b) => {
                            // Sort by uploadTime (or endTime) in ascending order
                            return dayjs(a.uploadTime).valueOf() - dayjs(b.uploadTime).valueOf();
                            // If sorting by endTime: return dayjs(a.endTime).valueOf() - dayjs(b.endTime).valueOf();
                        }).map((item, index) => (
                            <li key={index} className='flex gap-4 border-2 border-black rounded-lg w-[100%] px-4 py-6'>

                                <div className='w-full'>
                                    <div className='flex justify-between w-full items-center text-indigo-600 font-semibold'>
                                        <p>
                                            {dayjs(item.endTime).format('DD-MM-YYYY')}
                                        </p>
                                        <p>
                                            {` ${dayjs(item.uploadTime).format('HH:mm:ss')} - ${dayjs(item.endTime).format('HH:mm:ss')}`}
                                        </p>

                                    </div><br />
                                    {/* {`$ ${dayjs(item.uploadTime).format('HH:mm:ss')} - ${dayjs(item.endTime).format('HH:mm:ss')}`}<br /> */}
                                    {`File Name : ${item.title}`}<br />
                                    {/* {`Start Time: ${dayjs(item.uploadTime).format('DD-MM-YYYY HH:mm:ss')}`}<br />
                                    {`End Time: ${dayjs(item.endTime).format('DD-MM-YYYY HH:mm:ss')}`}<br /> */}

                                    {/* {`${dayjs(item.uploadTime).format('HH:mm:ss')} - ${dayjs(item.endTime).format('HH:mm:ss')}`} */}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default page