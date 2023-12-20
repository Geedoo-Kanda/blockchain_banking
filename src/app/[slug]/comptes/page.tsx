"use client"

import React, { useEffect, useState } from 'react';
import { useSlug } from '../SlugContext';

export default function User() {
    const slug = useSlug();

    const [displayText, setDisplayText] = useState("");
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (hovered) {
            timeoutId = setTimeout(() => {
                setDisplayText(slug);
            }, 100);

            return () => {
                clearTimeout(timeoutId);
            };
        } else {
            setDisplayText(slug.slice(0, 4) + ' ... ' + slug.slice(-4));
        }
    }, [hovered, slug]);

    const handleMouseOver = () => {
        setHovered(true);
    };

    const handleMouseOut = () => {
        setHovered(false);
    };

    return <main>
        <div className='flex justify-between my-3 items-center'>
            <div className='text-3xl text-gray-700 font-bold'>Les comptes</div>
            <div className='flex justify-end space-x-2'>
                <span className='bg-gray-200 p-2 rounded-full text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68" /></svg>
                </span>
                <span className='bg-gray-200 p-2 rounded-full text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M27 25c0 1.657-4.925 3-11 3S5 26.657 5 25m22 0c0-1.47-3.88-2.694-9-2.95M27 25c0-2-.2-6.2-3-9c-2.986-2.986-.513-7.427-5-8.668M5 25c0-1.47 3.88-2.694 9-2.95M5 25c0-2 .2-6.2 3-9c2.986-2.986.513-7.427 5-8.668m1 14.717a40.015 40.015 0 0 1 4 0m-4 0V23a2 2 0 1 0 4 0v-.95M13 7.331C13.773 7.12 14.751 7 16 7s2.227.119 3 .332m-6 0V7a3 3 0 0 1 6 0v.332" /></svg>
                </span>
            </div>
        </div>

        <div className="overflow-x-auto mt-3">
            <div className="inline-block min-w-full py-1.5 align-middle">
                <div className="overflow-hidden border border-blue-200  md:rounded-lg">
                    <table className="min-w-full divide-y divide-blue-300 ">
                        <thead className="bg-blue-600">
                            <tr>
                                <th scope="col" className="py-1.5 px-4 text-sm flex items-center justify-center text-center text-white font-bold">
                                    <div className="flex items-center">
                                        #
                                    </div>
                                </th>

                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Nom
                                </th>
                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Email
                                </th>
                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Adresse
                                </th>
                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Age
                                </th>
                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Solde envoyé
                                </th>
                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Solde reçu
                                </th>
                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Balance
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 py-2">
                            <tr>
                                <td className="py-1.5 px-2 text-sm font-medium text-gray-700 whitespace-nowrap text-center">
                                    1
                                </td>
                                <td className="py-1.5 px-2 text-sm text-gray-700 whitespace-nowrap text-center uppercase font-medium">
                                    Kanda Geedoo
                                </td>
                                <td className="py-1.5 px-2 text-sm text-gray-700 whitespace-nowrap text-center">
                                    geedookanda06@gmail.com
                                </td>
                                <td className="py-1.5 px-2 text-sm text-gray-700 whitespace-nowrap text-center">
                                    <span className=' flex justify-center'>
                                        <div
                                            onMouseOver={handleMouseOver}
                                            onMouseOut={handleMouseOut}
                                            className={`text-blue-600 bg-blue-100 py-2 rounded-full px-3 relative overflow-hidden whitespace-nowrap ${hovered ? 'overflow-visible transition-all duration-700' : ''}`}
                                        >
                                            <span className="overflow-hidden whitespace-nowrap">
                                                {displayText}
                                            </span>
                                        </div>
                                    </span>
                                </td>
                                <td className="py-1.5 px-2 text-sm text-gray-700 whitespace-nowrap text-center">
                                    23 ans
                                </td>

                                <td className="py-1.5 px-2 text-sm text-gray-700 max-w-[300px] text-center">
                                    <div className='flex items-center space-x-2 justify-center'>
                                        <div>
                                            <span className='font-medium text-xl'> 1500 </span> <small className='text-gray-400'>ETH</small>
                                        </div>
                                        <span className='p-2 flex bg-red-50 rounded-sm text-red-600 flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9 5v2h6.59L4 18.59L5.41 20L17 8.41V15h2V5z" /></svg>
                                        </span>
                                    </div>
                                </td>
                                <td className="py-1.5 px-2 items-center text-sm text-gray-700 max-w-[300px] text-center space-x-2">
                                    <div className='flex items-center space-x-2 justify-center'>
                                        <div>
                                            <span className='font-medium text-xl'> 1500 </span> <small className='text-gray-400'>ETH</small>
                                        </div>
                                        <span className='p-2 flex bg-blue-50 rounded-sm text-blue-600'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19.3 4.71a.996.996 0 0 0-1.41 0L7 15.59V10c0-.55-.45-1-1-1s-1 .45-1 1v8c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8.41L19.3 6.11c.38-.38.38-1.02 0-1.4" /></svg>
                                        </span>
                                    </div>

                                </td>
                                <td className="py-1.5 px-2 items-center text-sm text-gray-700 max-w-[300px] text-center space-x-2">
                                    <div className='flex items-center space-x-2 justify-center'>
                                        <div>
                                            <span className='font-medium text-xl'> 1500 </span> <small className='text-gray-400'>ETH</small>
                                        </div>
                                        <span className='p-2 flex bg-blue-50 rounded-sm text-blue-600'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 16v-5q0-.425.288-.712T6 10q.425 0 .713.288T7 11v5q0 .425-.288.713T6 17q-.425 0-.712-.288T5 16m6 0v-5q0-.425.288-.712T12 10q.425 0 .713.288T13 11v5q0 .425-.288.713T12 17q-.425 0-.712-.288T11 16m-8 5q-.425 0-.712-.288T2 20q0-.425.288-.712T3 19h18q.425 0 .713.288T22 20q0 .425-.288.713T21 21zm14-5v-5q0-.425.288-.712T18 10q.425 0 .713.288T19 11v5q0 .425-.288.713T18 17q-.425 0-.712-.288T17 16m4-8H2.9q-.375 0-.638-.262T2 7.1v-.55q0-.275.138-.475T2.5 5.75l8.6-4.3q.425-.2.9-.2t.9.2l8.55 4.275q.275.125.413.375t.137.525V7q0 .425-.287.713T21 8" /></svg>
                                        </span>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main >
}