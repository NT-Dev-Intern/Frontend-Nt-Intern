'use client'

import React, { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { isAuthenticated } from '@/Utils/Auth';
import Axios from '@/Utils/Axios';

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleMP3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);

        }

    };

    const handleUpload = async () => {
        const token = localStorage.getItem('authToken');
        
        if (!selectedFile) {
          console.error('No file selected');
          return;
        }
      
        try {
          const formData = new FormData();
          formData.append('file', selectedFile);
      
          const res = await Axios.post('/users/upload-mp3', formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
      
          console.log('Response from server:', res.data);
          window.location.href = '/dashboard';
          // Handle success scenario here if needed
      
        } catch (err) {
          console.error('Failed to upload MP3:', err);
          // Handle error scenario here if needed
        }
      };

    useEffect(() => {
        isAuthenticated();
    }, [])

    return (
        <div>
            <div className='h-screen flex justify-center items-center w-full gap-12'>
                <div className="flex items-center justify-center w-[50vw] ">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            {selectedFile ?
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                        {selectedFile.name}
                                    </span>
                                </p>
                                : <>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">
                                            "Click to upload"
                                        </span>
                                        or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">MP3 (MAX. 800x400px)</p>
                                </>}


                        </div>
                        <input id="dropzone-file" onChange={handleMP3} type="file" className="hidden" />
                    </label>
                </div>
                <div className="mt-6 ">
                    <button
                        type="button"
                        onClick={handleUpload}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        Upload MP3
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Upload