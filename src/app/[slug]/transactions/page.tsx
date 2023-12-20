"use client"

import React, { useEffect, useState } from 'react';
import { useSlug } from '../SlugContext';
import Modal from '@/app/components/Modal';
import TransactionForm from '@/app/components/TransactionForm';
import { initSimpleWalletWeb3, initSimpleWalletContract, initSimpleWalletAccounts, getTransactionsByAddress, getStatisticsByAddress } from '../../funcs/SimpleWallet';
import { initUserProfileWeb3, initUserProfileContract, initUserProfileAccounts, getAllUserProfiles } from '../../funcs/UserProfil';
import Web3 from 'web3';


export default function User() {
    const slug = useSlug();
    const [modal, setmodal] = useState<any>(false);
    const [users, setUsers] = useState<string[]>([]);
    const [transactions, setTransactions] = useState<string[]>([]);
    const [stat, setStat] = useState<string[]>([]);
    const web3 = new Web3(window.ethereum);
    const [contractSimpleWallet, setContractSimpleWallet] = useState<any | null>(null);
    const [accountsSimpleWallet, setAccountsSimpleWallet] = useState<string[]>([]);

    useEffect(() => {
        const initBlockchain = async () => {

            const web3UserProfileInstance = await initUserProfileWeb3();
            const contractUserProfileInstance = await initUserProfileContract(web3UserProfileInstance);
            const accountsListUserProfile = await initUserProfileAccounts(web3UserProfileInstance);

            setUsers(await getAllUserProfiles(contractUserProfileInstance));

            const web3SimpleWalletInstance = await initSimpleWalletWeb3();
            const contractSimpleWalletInstance = await initSimpleWalletContract(web3SimpleWalletInstance);
            const accountsListSimpleWallet = await initSimpleWalletAccounts(web3SimpleWalletInstance);

            setTransactions(await getTransactionsByAddress(contractSimpleWalletInstance, slug));
            setStat(await getStatisticsByAddress(contractSimpleWalletInstance, slug));

            setContractSimpleWallet(contractSimpleWalletInstance);
            setAccountsSimpleWallet(accountsListSimpleWallet);
        };
        initBlockchain();
    }, []);

    const Add = () => {
        setmodal(true);
    };

    const closeModal = async () => {
        setmodal(false);
        setTransactions(await getTransactionsByAddress(contractSimpleWallet, slug));
        setStat(await getStatisticsByAddress(contractSimpleWallet, slug));
    };

    return <main>
        <div className='flex justify-between my-3 items-center'>
            <div className='text-3xl text-gray-700 font-bold'>Mes transactions</div>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19.3 4.71a.996.996 0 0 0-1.41 0L7 15.59V10c0-.55-.45-1-1-1s-1 .45-1 1v8c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8.41L19.3 6.11c.38-.38.38-1.02 0-1.4" /></svg>
                    </span>
                    <h2 className='text-md font-medium text-gray-700'>Totale reception</h2>
                </div>
                <div className='flex items-center space-x-4'>
                    <h1 className='text-bold text-4xl mt-2 text-gray-800'>
                        {stat[2] ?
                            web3.utils.fromWei(stat[2], 'ether')?.toString() : 0
                        }
                        <small className='text-sm text-gray-700'>ETH</small></h1> <span className='bg-blue-600 text-white px-2 py-0.5 rounded-full'>+15%</span>
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
                    <h1 className='text-bold text-4xl mt-2 text-gray-800'>{
                        stat[1] ?
                            web3.utils.fromWei(stat[1], 'ether')?.toString() : 0
                    } <small className='text-sm text-gray-700'>ETH</small></h1> <span className='bg-blue-600 text-white px-2 py-0.5 rounded-full'>+15%</span>
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
                    <h1 className='text-bold text-4xl mt-2 text-gray-800'>{stat[0]?.toString()} <small className='text-sm text-gray-700'>Transactions</small></h1>
                </div>
                <div className="flex text-md text-gray-600 justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className='text-blue-600' width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6z"></path></svg>
                        <span className=""> Test 2 </span>
                    </div>
                    <span className="font-bold"> 300 </span>
                </div>
            </div>
            <div className='bg-white hover:bg-blue-200 rounded-xl shadow-md shadow-gray-200 p-5 flex items-center justify-center cursor-pointer' onClick={Add}>
                <div>
                    <div className='flex items-center justify-center'>
                        <span className='bg-blue-100 text-blue-600 p-2 flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" /></svg>
                        </span>
                    </div>
                    <div className='text-lg text-gray-700'>Ajouter une transaction</div>
                </div>
            </div>
            <Modal show={modal} onClose={closeModal}>
                <svg className="text-xl md:text-2xl text-gray-500 absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={closeModal} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 26 26"><g fill="currentColor"><path d="M10.172 17.243a1 1 0 1 1-1.415-1.415l7.071-7.07a1 1 0 1 1 1.415 1.414l-7.071 7.07Z" /><path d="M8.757 10.172a1 1 0 0 1 1.415-1.415l7.07 7.071a1 1 0 1 1-1.414 1.415l-7.07-7.071Z" /><path fill-rule="evenodd" d="M13 24c6.075 0 11-4.925 11-11S19.075 2 13 2S2 6.925 2 13s4.925 11 11 11Zm0 2c7.18 0 13-5.82 13-13S20.18 0 13 0S0 5.82 0 13s5.82 13 13 13Z" clip-rule="evenodd" /></g></svg>
                <TransactionForm />
            </Modal>
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
                                    Date de la transaction
                                </th>
                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Expeditaire
                                </th>
                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Destinataire
                                </th>
                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Montant
                                </th>

                                <th scope="col" className="px-2 py-1.5 text-sm text-center text-white font-bold">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 py-2">
                            {
                                transactions?.map((transaction: any, index: any) => (
                                    <tr key={index}>
                                        <td className="py-1.5 px-2 text-sm font-medium text-gray-700 whitespace-nowrap text-center">
                                            {index + 1}
                                        </td>
                                        <td className="py-1.5 px-2 text-sm text-gray-700 whitespace-nowrap text-center">
                                            12/11/2019
                                        </td>
                                        <td className="py-3 px-2 text-sm text-gray-700 whitespace-nowrap text-center">
                                            {
                                                users?.map((user: any, key: any) => (
                                                    user.userAddress === transaction.sender ?
                                                        <div className='mb-2 uppercase font-semibold' key={key}>
                                                            {user.username}
                                                        </div> : ''
                                                ))
                                            }

                                            <span className='text-blue-600 bg-blue-100 py-2 rounded-full px-3 '>
                                                {transaction.sender.slice(0, 4) + '...' + transaction.sender.slice(-4)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2 text-sm text-gray-700 whitespace-nowrap text-center">
                                            {
                                                users?.map((user: any, key: any) => (
                                                    user.userAddress === transaction.recipient ?
                                                        <div className='mb-2 uppercase font-semibold' key={key}>
                                                           {user.username}
                                                        </div> : ''
                                                ))
                                            }
                                            <span className='text-blue-600 bg-blue-100 py-2 rounded-full px-3 '>
                                                {transaction.recipient.slice(0, 4) + '...' + transaction.recipient.slice(-4)}
                                            </span>
                                        </td>
                                        <td className="py-1.5 px-2 text-sm text-gray-700 whitespace-nowrap text-center">
                                            <span className='text-lg text-blue-600 font-semibold rounded-full'>{
                                                web3.utils.fromWei(transaction.amount, 'ether')?.toString()
                                            }</span> ETH
                                        </td>

                                        <td className="py-1.5 px-2 text-sm text-gray-700 max-w-[300px] text-center">
                                            {
                                                transaction.description
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
}