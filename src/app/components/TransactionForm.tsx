// Import des modules nécessaires
import React, { useEffect, useState, Fragment } from 'react';
import { initUserProfileWeb3, initUserProfileContract, initUserProfileAccounts, getAllUserProfiles } from '../funcs/UserProfil';
import { initSimpleWalletWeb3, initSimpleWalletContract, initSimpleWalletAccounts, transferFunds } from '../funcs/SimpleWallet';
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface FormTransac {
    recipient: any;
    amount: string;
    description: string;
}

const TransactionForm: React.FC = () => {
    const [contractSimpleWallet, setContractSimpleWallet] = useState<any | null>(null);
    const [accountsSimpleWallet, setAccountsSimpleWallet] = useState<string[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [selected, setSelected] = useState<any | null>(users[0])
    const [query, setQuery] = useState('')


    useEffect(() => {
        const initBlockchain = async () => {

            const web3UserProfileInstance = await initUserProfileWeb3();
            const contractUserProfileInstance = await initUserProfileContract(web3UserProfileInstance);
            const accountsListUserProfile = await initUserProfileAccounts(web3UserProfileInstance);

            const allProfiles = await getAllUserProfiles(contractUserProfileInstance);

            // Filtrez les profils pour exclure le profil connecté
            const filteredProfiles = allProfiles.filter((profile: { userAddress: any; }) => profile.userAddress !== accountsListUserProfile[0]);
            
            // Définissez les utilisateurs avec la liste filtrée
            setUsers(filteredProfiles);
            const web3SimpleWalletInstance = await initSimpleWalletWeb3();
            const contractSimpleWalletInstance = await initSimpleWalletContract(web3SimpleWalletInstance);
            const accountsListSimpleWallet = await initSimpleWalletAccounts(web3SimpleWalletInstance);

            setContractSimpleWallet(contractSimpleWalletInstance);
            setAccountsSimpleWallet(accountsListSimpleWallet);
        };
        initBlockchain();
    }, []);

    const [formTransac, setFormTransac] = useState<FormTransac>({
        recipient: "",
        amount: "",
        description: ""
    });

    const filteredPeople =
        query === ''
            ? users
            : users.filter((person: any) => {
                return person.username.toLowerCase().includes(query.toLowerCase())
            })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement> | any): void => {
        const { name, value } = e.target;
        setFormTransac((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        formTransac.recipient = selected.userAddress;

        transferFunds(contractSimpleWallet, formTransac.recipient, formTransac.amount, formTransac.description, accountsSimpleWallet)
        setSelected('')
        setFormTransac({
            recipient: "",
            amount: "",
            description: ""
        });
    }

    return (
        <form className="w-full bg-white max-w-3xl py-6 px-3 rounded-md" onSubmit={handleSubmit}>
            <h2 className='text-violet-500 text-2xl font-semibold text-center mb-3'>Transferer de fonds</h2>
            <div>
                <div className='grid grid-cols-2 gap-3 px-4'>
                    <div>
                        <label className='text-xs text-gray-500 font-medium' htmlFor="recipient">Votre recipient</label>
                        <Combobox value={selected} onChange={setSelected}>
                            <div className="relative">
                                <div className='border block rounded-md border-gray-300 w-full'>
                                    <Combobox.Input
                                        className="w-full rounded-md border-none py-1 pl-3 pr-10 text-sm leading-5 text-gray-900"
                                        displayValue={(person: any) => person.username}
                                        onChange={(event) => setQuery(event.target.value)}
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </Combobox.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    afterLeave={() => setQuery('')}
                                >
                                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto z-50 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {filteredPeople.length === 0 && query !== '' ? (
                                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                Nothing found.
                                            </div>
                                        ) : (
                                            filteredPeople.map((person: any) => (
                                                <Combobox.Option
                                                    key={person.userAddress}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'
                                                        }`
                                                    }
                                                    value={person}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                    } uppercase`}
                                                            >
                                                                {person.username}
                                                            </span>
                                                            {selected ? (
                                                                <span
                                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-600'
                                                                        }`}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Combobox.Option>
                                            ))
                                        )}
                                    </Combobox.Options>
                                </Transition>
                            </div>
                        </Combobox>
                    </div>
                    <div>
                        <label className='text-xs text-gray-500 font-medium' htmlFor="amount">Votre amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formTransac.amount}
                            onChange={handleInputChange}
                            className='border block py-0.5 rounded-md px-1 border-gray-300 w-full'
                        />
                    </div>
                    <div className='col-span-full'>
                        <label className='text-xs text-gray-500 font-medium' htmlFor="description">Votre descriptiongraphie</label>
                        <textarea name="description" id="" rows={3} value={formTransac.description}
                            onChange={handleInputChange}
                            className='border block py-0.5 rounded-md px-1 border-gray-300 w-full'></textarea>
                    </div>

                </div>
                <div className='flex justify-between'>
                    <button className='text-white bg-blue-600 font-medium px-5 py-2 text-sm rounded-md mt-3 flex w-full justify-center' type="submit">Enregistrer</button>
                </div>
            </div>
        </form >
    );
};

export default TransactionForm;

