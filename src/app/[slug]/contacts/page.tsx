"use client"

import React, { useEffect, useState } from 'react';
import { useSlug } from '../SlugContext';
import { initSimpleWalletWeb3, initSimpleWalletContract, initSimpleWalletAccounts, getTransactionsByAddress, getStatisticsByAddress } from '../../funcs/SimpleWallet';
import { initUserProfileWeb3, initUserProfileContract, initUserProfileAccounts, getAllUserProfiles } from '../../funcs/UserProfil';
import Web3 from 'web3';

export default function User() {
    const slug = useSlug();
    const [userHovered, setUserHovered] = useState<string | null>(null);
    const [users, setUsers] = useState<string[]>([]);
    const [transactions, setTransactions] = useState<string[] | any>([]);

    useEffect(() => {
        const initBlockchain = async () => {

            const web3UserProfileInstance = await initUserProfileWeb3();
            const contractUserProfileInstance = await initUserProfileContract(web3UserProfileInstance);
            const accountsListUserProfile = await initUserProfileAccounts(web3UserProfileInstance);

            const allProfiles = await getAllUserProfiles(contractUserProfileInstance);
            const filteredProfiles = allProfiles.filter((profile: { userAddress: any; }) => profile.userAddress !== accountsListUserProfile[0]);
            setUsers(filteredProfiles);

            const web3SimpleWalletInstance = await initSimpleWalletWeb3();
            const contractSimpleWalletInstance = await initSimpleWalletContract(web3SimpleWalletInstance);
            const accountsListSimpleWallet = await initSimpleWalletAccounts(web3SimpleWalletInstance);

            setTransactions(await getTransactionsByAddress(contractSimpleWalletInstance, slug));

        };
        initBlockchain();

    }, []);



    function calculateReceiverSumByAddress(adresse: any) {
        const sum = transactions
            .filter((transaction: { recipient: any; }) => transaction.recipient === adresse)
            .reduce((accumulator: any, transaction: { amount: any; }) => accumulator + BigInt(transaction.amount), BigInt(0))
        return sum;
    }

    function calculateSenderSumByAddress(adresse: any) {
        const sum = transactions
            .filter((transaction: { sender: any; }) => transaction.sender === adresse)
            .reduce((accumulator: any, transaction: { amount: any; }) => accumulator + BigInt(transaction.amount), BigInt(0))
        return sum;
    }


    const handleMouseOver = (address: string) => {
        setUserHovered(address);
    };

    const handleMouseOut = () => {
        setUserHovered(null);
    };

    return <main>
        <div className='flex justify-between my-3 items-center'>
            <div className='text-3xl text-gray-700 font-bold'>Mes contacts</div>
            <div className='flex justify-end space-x-2'>
                <span className='bg-white shadow-md shadow-gray-100 p-2 rounded-full text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68" /></svg>
                </span>
                <span className='bg-white shadow-md shadow-gray-100 p-2 rounded-full text-gray-600'>
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
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 py-2">
                            {
                                users?.map((user: any, key: any) => (
                                    <tr key={key}>
                                        <td className="py-1.5 px-2 text-sm font-medium text-gray-700 whitespace-nowrap text-center">
                                            {key + 1}
                                        </td>
                                        <td className="py-1.5 px-2 text-sm text-gray-700 whitespace-nowrap text-center uppercase font-semibold">
                                            {user.username}
                                        </td>
                                        <td className="py-1.5 px-2 text-sm text-gray-700 whitespace-nowrap text-center">
                                            {user.email}
                                        </td>
                                        <td className="py-1.5 px-2 text-sm text-gray-700 whitespace-nowrap text-center">
                                            <span className='flex justify-center'>
                                                <div
                                                    onMouseOver={() => handleMouseOver(user.userAddress)}
                                                    onMouseOut={handleMouseOut}
                                                    className={`text-blue-600 bg-blue-100 py-2 rounded-full px-3 relative overflow-hidden whitespace-nowrap ${userHovered === user.userAddress ? 'overflow-visible transition-all duration-700' : ''}`}
                                                >
                                                    <span className="overflow-hidden whitespace-nowrap">
                                                        {userHovered === user.userAddress ? user.userAddress : user.userAddress.slice(0, 4) + ' ... ' + user.userAddress.slice(-4)}
                                                    </span>
                                                </div>
                                            </span>
                                        </td>
                                        <td className="py-1.5 px-2 text-sm text-gray-700 whitespace-nowrap text-center">
                                            {user.age.toString()} ans
                                        </td>

                                        <td className="py-1.5 px-2 text-sm text-gray-700 max-w-[300px] text-center">
                                            <div className='flex items-center space-x-2 justify-center'>
                                                <div>
                                                    <span className='font-medium text-xl'> {
                                                        Web3.utils.fromWei(calculateReceiverSumByAddress(user.userAddress), 'ether')?.toString()
                                                    } </span> <small className='text-gray-400'>ETH</small>
                                                </div>
                                                <span className='p-2 flex bg-red-50 rounded-sm text-red-600 flex'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9 5v2h6.59L4 18.59L5.41 20L17 8.41V15h2V5z" /></svg>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-1.5 px-2 flex items-center text-sm text-gray-700 max-w-[300px] text-center space-x-2 justify-center">

                                            <div>
                                                <span className='font-medium text-xl'> {
                                                    Web3.utils.fromWei(calculateSenderSumByAddress(user.userAddress), 'ether')?.toString()
                                                } </span> <small className='text-gray-400'>ETH</small>
                                            </div>
                                            <span className='p-2 flex bg-blue-50 rounded-sm text-blue-600'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19.3 4.71a.996.996 0 0 0-1.41 0L7 15.59V10c0-.55-.45-1-1-1s-1 .45-1 1v8c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8.41L19.3 6.11c.38-.38.38-1.02 0-1.4" /></svg>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main >
}