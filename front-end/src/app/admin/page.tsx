'use client'

import Axios from '@/Utils/Axios'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserData } from './types'



const Admin = () => {

    const [users, setUsers] = useState<UserData[]>([])

    const getUsers = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const res = await axios.get('http://localhost:8080/admin/get-users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUsers(res.data)
            console.log(res.data)
        } catch (err) {
            console.error('Error fetching users:', err)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="bg-gray-900 h-screen">
            <div className="mx-auto max-w-7xl">
                <div className="bg-gray-900 py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-white">Users</h1>
                                <p className="mt-2 text-sm text-gray-300">
                                    A list of all the users in your account including their name, title, email and role.
                                </p>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <button
                                    type="button"
                                    className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Add user
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                                    ID
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    UserName
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Company
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Role
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">Delete</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                            {users.map((person) => (
                                                <tr key={person.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                                        {person.id}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.username}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">7-eleven</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.role}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                        <p className="text-indigo-400 hover:text-indigo-300">
                                                            Delete<span className="sr-only">, {person.username}</span>
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin