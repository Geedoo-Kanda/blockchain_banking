"use client"

import React from 'react';
import { useSlug } from './SlugContext';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';

export default function User() {
    const slug = useSlug();

    return <main>
        <div className='flex justify-between my-3 items-center'>
            <div className='text-3xl text-gray-700 font-bold'>Tableau de bord</div>
            <div className='flex justify-end space-x-2'>
                <span className='bg-white shadow-md shadow-gray-100 p-2 rounded-full text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68" /></svg>
                </span>
                <span className='bg-white shadow-md shadow-gray-100 p-2 rounded-full text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M27 25c0 1.657-4.925 3-11 3S5 26.657 5 25m22 0c0-1.47-3.88-2.694-9-2.95M27 25c0-2-.2-6.2-3-9c-2.986-2.986-.513-7.427-5-8.668M5 25c0-1.47 3.88-2.694 9-2.95M5 25c0-2 .2-6.2 3-9c2.986-2.986.513-7.427 5-8.668m1 14.717a40.015 40.015 0 0 1 4 0m-4 0V23a2 2 0 1 0 4 0v-.95M13 7.331C13.773 7.12 14.751 7 16 7s2.227.119 3 .332m-6 0V7a3 3 0 0 1 6 0v.332" /></svg>
                </span>
            </div>
        </div>
        <div className='grid grid-cols-4 gap-3'>
            <div className='bg-white rounded-xl shadow-md shadow-gray-200 p-5'>
                <div className='flex items-center space-x-2'>
                    <span className='p-2 bg-blue-50 rounded-sm text-blue-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 16v-5q0-.425.288-.712T6 10q.425 0 .713.288T7 11v5q0 .425-.288.713T6 17q-.425 0-.712-.288T5 16m6 0v-5q0-.425.288-.712T12 10q.425 0 .713.288T13 11v5q0 .425-.288.713T12 17q-.425 0-.712-.288T11 16m-8 5q-.425 0-.712-.288T2 20q0-.425.288-.712T3 19h18q.425 0 .713.288T22 20q0 .425-.288.713T21 21zm14-5v-5q0-.425.288-.712T18 10q.425 0 .713.288T19 11v5q0 .425-.288.713T18 17q-.425 0-.712-.288T17 16m4-8H2.9q-.375 0-.638-.262T2 7.1v-.55q0-.275.138-.475T2.5 5.75l8.6-4.3q.425-.2.9-.2t.9.2l8.55 4.275q.275.125.413.375t.137.525V7q0 .425-.287.713T21 8" /></svg>
                    </span>
                    <h2 className='text-md font-medium text-gray-700'>Total balance</h2>
                </div>
                <div className='flex items-center space-x-4'>
                    <h1 className='text-bold text-4xl mt-2 text-gray-800'>4,62 <small className='text-sm text-gray-700'>ETH</small></h1> <span className='bg-blue-600 text-white px-3 py-0.5 rounded-full'>+15%</span>
                </div>
                <div className="flex text-md text-gray-600 justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className='text-blue-600' width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6z"></path></svg>
                        <span className=""> Test 2 </span>
                    </div>
                    <span className="font-bold"> 300 </span>
                </div>
            </div>
            <div className='bg-white rounded-xl shadow-md shadow-gray-200 p-5'>
                <div className='flex items-center space-x-2'>
                    <span className='p-2 bg-blue-50 rounded-sm text-blue-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19.3 4.71a.996.996 0 0 0-1.41 0L7 15.59V10c0-.55-.45-1-1-1s-1 .45-1 1v8c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8.41L19.3 6.11c.38-.38.38-1.02 0-1.4" /></svg>
                    </span>
                    <h2 className='text-md font-medium text-gray-700'>Totale reception</h2>
                </div>
                <div className='flex items-center space-x-4'>
                    <h1 className='text-bold text-4xl mt-2 text-gray-800'>4,62 <small className='text-sm text-gray-700'>ETH</small></h1> <span className='bg-blue-600 text-white px-3 py-0.5 rounded-full'>+15%</span>
                </div>
                <div className="flex text-md text-gray-600 justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className='text-blue-600' width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6z"></path></svg>
                        <span className=""> Test 2 </span>
                    </div>
                    <span className="font-bold"> 300 </span>
                </div>
            </div>
            <div className='bg-white rounded-xl shadow-md shadow-gray-200 p-5'>
                <div className='flex items-center space-x-2'>
                    <span className='p-2 bg-blue-50 rounded-sm text-blue-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9 5v2h6.59L4 18.59L5.41 20L17 8.41V15h2V5z" /></svg>    </span>
                    <h2 className='text-md font-medium text-gray-700'>Total envoi</h2>
                </div>
                <div className='flex items-center space-x-4'>
                    <h1 className='text-bold text-4xl mt-2 text-gray-800'>4,62 <small className='text-sm text-gray-700'>ETH</small></h1> <span className='bg-blue-600 text-white px-3 py-0.5 rounded-full'>+15%</span>
                </div>
                <div className="flex text-md text-gray-600 justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className='text-blue-600' width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6z"></path></svg>
                        <span className=""> Test 2 </span>
                    </div>
                    <span className="font-bold"> 300 </span>
                </div>
            </div>
            <div className='bg-white rounded-xl shadow-md shadow-gray-200 p-5'>
                <div className='flex items-center space-x-2'>
                    <span className='p-2 bg-blue-50 rounded-sm text-blue-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"><path fill="currentColor" d="M668.6 320c0-4.4-3.6-8-8-8h-54.5c-3 0-5.8 1.7-7.1 4.4l-84.7 168.8H511l-84.7-168.8a8 8 0 0 0-7.1-4.4h-55.7c-1.3 0-2.6.3-3.8 1c-3.9 2.1-5.3 7-3.2 10.8l103.9 191.6h-57c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76v39h-76c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76V704c0 4.4 3.6 8 8 8h49.9c4.4 0 8-3.6 8-8v-63.5h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8h-76.3v-39h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8H564l103.7-191.6c.5-1.1.9-2.4.9-3.7M157.9 504.2a352.7 352.7 0 0 1 103.5-242.4c32.5-32.5 70.3-58.1 112.4-75.9c43.6-18.4 89.9-27.8 137.6-27.8c47.8 0 94.1 9.3 137.6 27.8c42.1 17.8 79.9 43.4 112.4 75.9c10 10 19.3 20.5 27.9 31.4l-50 39.1a8 8 0 0 0 3 14.1l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3l-47.8 37.4C770.7 146.3 648.6 82 511.5 82C277 82 86.3 270.1 82 503.8a8 8 0 0 0 8 8.2h60c4.3 0 7.8-3.5 7.9-7.8M934 512h-60c-4.3 0-7.9 3.5-8 7.8a352.7 352.7 0 0 1-103.5 242.4a352.57 352.57 0 0 1-112.4 75.9c-43.6 18.4-89.9 27.8-137.6 27.8s-94.1-9.3-137.6-27.8a352.57 352.57 0 0 1-112.4-75.9c-10-10-19.3-20.5-27.9-31.4l49.9-39.1a8 8 0 0 0-3-14.1l-156.8-38.3c-5-1.2-9.9 2.6-9.9 7.7l-.8 161.7c0 6.7 7.7 10.5 12.9 6.3l47.8-37.4C253.3 877.7 375.4 942 512.5 942C747 942 937.7 753.9 942 520.2a8 8 0 0 0-8-8.2" /></svg>
                    </span>
                    <h2 className='text-md font-medium text-gray-700'>Total transaction</h2>
                </div>
                <div className='flex items-center space-x-4'>
                    <h1 className='text-bold text-4xl mt-2 text-gray-800'>1520 <small className='text-sm text-gray-700'>Transactions</small></h1>
                </div>
                <div className="flex text-md text-gray-600 justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className='text-blue-600' width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6z"></path></svg>
                        <span className=""> Test 2 </span>
                    </div>
                    <span className="font-bold"> 300 </span>
                </div>
            </div>
        </div>

        <div className='grid grid-cols-12 gap-4 mt-5'>
            <div className='col-span-7 bg-white shadow-md p-3 rounded-md shadow-gray-200'>
                <LineChart />
            </div>
            <div className='col-span-5 pt-12 bg-white shadow-md p-3 rounded-md shadow-gray-200'>
                <PieChart />
            </div>
        </div>
        <div>My Post: {slug}</div>
    </main>
}