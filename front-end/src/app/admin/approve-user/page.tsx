"use client"

import React, { useEffect, useState } from 'react'
import { CompanyData, PendingUserData } from './types'
import axios from 'axios'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const page = () => {

    const [pendingusers, setPendingUsers] = useState<PendingUserData[]>([])
    const [company, setCompany] = useState<CompanyData[]>([])
    const [selectedCompanies, setSelectedCompanies] = useState<{ [key: number]: CompanyData }>({});

    const fetchData = async () => {
        const res = await axios.get('http://localhost:8080/admin/get-approved-users')
        console.log(res.data)
        setPendingUsers(res.data)
    }

    const companyData = async () => {
        const res = await axios.get('http://localhost:8080/admin/get-companies')
        setCompany(res.data)
        console.log(res.data)
    }

    const handleApprove = async (userId: number, companyName: string) => {
        if(!companyName){
            alert('Please select a company')
            return
        }
        try {
            const res = await axios.post('http://localhost:8080/admin/approve-user', {
                userId,
                companyName
            });
            console.log(res.data);
            await fetchData();
            await companyData();
        } catch (err) {
            console.error('Error approving user:', err);
        }
    };

    const handleDecline = async (userId: number) => {
        try {
            const res = await axios.post('http://localhost:8080/admin/decline-user', {
                userId
            });
            console.log(res.data);
            await fetchData();
            await companyData();
        } catch (err) {
            console.error('Error declining user:', err);
        }
    }

    const handleCompanyChange = (userId: number, company: CompanyData) => {
        setSelectedCompanies((prev) => ({ ...prev, [userId]: company }));
    };

    useEffect(() => {
        fetchData()
        companyData()
    }, [])

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 h-screen">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-screen">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg h-full">
                            <table className="min-w-full divide-y divide-gray-300 ">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Id</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Username</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Firstname</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Lastname</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Select User Company</th>
                                        <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'><span className="sr-only">Edit</span></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {pendingusers.map((person) => (
                                        <tr key={person.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{person.id}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.username}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.firstname}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.lastname}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.company}</td>
                                            <td className='relative'>
                                                <Listbox value={selectedCompanies[person.id]} onChange={(value) => handleCompanyChange(person.id, value)}>
                                                    {({ open }) => (
                                                        <div className='relative'>
                                                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                                <span className="block truncate">{selectedCompanies[person.id]?.name || "Select a company"}</span>
                                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                                            </Listbox.Button>
                                                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm">
                                                                {company.map((comp) => (
                                                                    <Listbox.Option
                                                                        key={comp.id}
                                                                        className={({ active }) =>
                                                                            `${active ? 'bg-indigo-600 text-white' : 'text-gray-900'} relative cursor-default select-none py-2 pl-3 pr-9`
                                                                        }
                                                                        value={comp}
                                                                    >
                                                                        {({ selected, active }) => (
                                                                            <>
                                                                                <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                                                                                    {comp.name}
                                                                                </span>
                                                                                {selected ? (
                                                                                    <span className={`${active ? 'text-white' : 'text-indigo-600'} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </div>
                                                    )}
                                                </Listbox>
                                            </td>
                                            <td className="flex gap-4 justify-center whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <button
                                                    onClick={() => handleApprove(person.id, selectedCompanies[person.id]?.name || "")}
                                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                onClick={() => handleDecline(person.id)}
                                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                    Decline
                                                </button>
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
    )
}

export default page