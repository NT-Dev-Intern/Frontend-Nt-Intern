import Link from 'next/link'
import React from 'react'

const Loginpage = () => {
  return (
    <div className='bg-[#F8D247] h-screen flex justify-center place-items-center'>
            <div className='bg-white h-[70vh] w-[70vw] rounded-[40px] shadow-2xl'>
                <div className='flex flex-col justify-center h-full ml-[10vw] gap-12  w-[742px]'>
                    <h1 className='text-[40px] font-bold '>
                        Log In
                    </h1>
                    
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
                    <button className='w-full rounded-lg bg-[#F8D247] py-2 border-black border'>
                        Log In
                    </button>
                    <p className='flex gap-1'>
                    Don't have account yet?  
                    <Link href={'/signup'} className='text-[#2110E4]'>
                        Register
                    </Link>
                    </p>
                </div>


            </div>
        </div>
  )
}

export default Loginpage