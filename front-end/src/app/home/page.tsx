import Link from 'next/link'
import React from 'react'

const HomePage = () => {
    return (
        <div className='bg-[#F8D247] h-screen flex justify-center place-items-center'>
            <div className='bg-white h-[90vh] w-[70vw] rounded-[40px] shadow-2xl flex justify-center '>
                <div className='flex flex-col  gap-12 w-fit'>
                    <h1 className='text-[40px] font-bold mt-[4vw]'>
                        Home Page
                    </h1>
                    <div className='flex gap-8'>
                        <div className="relative">
                            <label
                                htmlFor="name"
                                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#808080]"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-[352px] h-[50px] rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="name"
                                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#808080]"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-[352px] h-[50px] rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            />
                        </div>
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="name"
                            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#808080]"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full h-[50px] rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="name"
                            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#808080]"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="name"
                            id="name"
                            className="block w-full h-[50px] rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="name"
                            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-[#808080]"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="name"
                            id="name"
                            className="block w-full h-[50px] rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        />
                    </div>
                    <button className='w-full rounded-lg bg-[#F8D247] py-2 border-black border'>
                        Create Account
                    </button>
                    <p className='flex gap-1'>
                    Already have an account? 
                    <Link href={'/login'} className='text-[#2110E4]'>
                        Login
                    </Link>
                    </p>
                </div>


            </div>
        </div>
    )
}

export default HomePage