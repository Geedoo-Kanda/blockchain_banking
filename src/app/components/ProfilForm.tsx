// Import des modules nécessaires
import React, { useEffect, useState } from 'react';
import { initUserProfileWeb3, initUserProfileContract, initUserProfileAccounts, createProfile } from '../funcs/UserProfil';


interface FormUser {
    username: string;
    age: string;
    email: string;
    photo: string;
    bio: string;
    password: string;
}

interface ProfilForm {
    slug: string;
}

const ProfilForm: React.FC<ProfilForm> = ({ slug }) =>{
    const [contractUserProfile, setContractUserProfile] = useState<any | null>(null);
    const [accountsUserProfile, setAccountsUserProfile] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [confirm_password, setconfirm_password] = useState('');
    
    useEffect(() => {
        const initBlockchain = async () => {

            const web3UserProfileInstance = await initUserProfileWeb3();
            const contractUserProfileInstance = await initUserProfileContract(web3UserProfileInstance);
            const accountsListUserProfile = await initUserProfileAccounts(web3UserProfileInstance);

            setContractUserProfile(contractUserProfileInstance);
            setAccountsUserProfile(accountsListUserProfile);
        };
        initBlockchain();
    }, []);

    const [formUser, setFormUser] = useState<FormUser>({
        username: "",
        age: "",
        email: "",
        photo: "",
        bio: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement> | any): void => {
        const { name, value } = e.target;
        setFormUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setconfirm_password(inputValue)
        setIsTyping(true);

        clearTimeout((handleInputChange as any).timer);
        (handleInputChange1 as any).timer = setTimeout(() => {
            setIsTyping(false);
        }, 2000);
    };

    // Gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        await createProfile(contractUserProfile, formUser, accountsUserProfile);

        setFormUser({
            username: "",
            age: "",
            email: "",
            photo: "",
            bio: "",
            password: ""
        });
        window.location.href = "/"+ slug
    }

    return (
        <form className="w-full bg-white max-w-3xl py-6 px-3 rounded-md" onSubmit={handleSubmit}>
            <h2 className='text-violet-500 text-2xl font-semibold text-center mb-3'>Completer votre profil</h2>
            <div>
                <div className='grid grid-cols-2 gap-3 px-4'>
                    <div>
                        <label className='text-xs text-gray-500 font-medium' htmlFor="username">Votre Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formUser.username}
                            onChange={handleInputChange}
                           className='border block py-0.5 rounded-md px-1 border-gray-300 w-full'
                        />
                    </div>
                    <div>
                        <label className='text-xs text-gray-500 font-medium' htmlFor="email">Votre Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formUser.email}
                            onChange={handleInputChange}
                           className='border block py-0.5 rounded-md px-1 border-gray-300 w-full'
                        />
                    </div>
                    <div>
                        <label className='text-xs text-gray-500 font-medium' htmlFor="age">Votre age</label>
                        <input
                            type="number"
                            name="age"
                            value={formUser.age}
                            onChange={handleInputChange}
                           className='border block py-0.5 rounded-md px-1 border-gray-300 w-full'
                        />
                    </div>
                    <div>
                        <label className='text-xs text-gray-500 font-medium' htmlFor="photo">Votre photo de profil</label>
                        <input
                            type="text"
                            name="photo"
                            value={formUser.photo}
                            onChange={handleInputChange}
                           className='border block py-0.5 rounded-md px-1 border-gray-300 w-full'
                        />
                    </div>
                    <div>
                        <label className='text-xs text-gray-500 font-medium' htmlFor="password">Votre password</label>
                        <input
                            type="password"
                            name="password"
                            value={formUser.password}
                            onChange={handleInputChange}
                            className='border block py-0.5 rounded-md px-1 border-gray-300 w-full'
                        />
                    </div>
                    <div>
                        <label className='text-xs text-gray-500 font-medium' htmlFor="confirm_password">Confirmer password</label>
                        <div className='flex space-x-1'>
                            <input
                                type="password"
                                name="confirm_password"
                                value={confirm_password}
                                onChange={handleInputChange1}
                                className='border block py-0.5 rounded-md px-1 border-gray-300 w-full'
                            />

                            {isTyping ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
                                : confirm_password === formUser.password && formUser.password.length > 0 ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" className='text-green-600' height="30" viewBox="0 0 16 16"><path fill="currentColor" d="m11.334 2.064l.077.153l.576 1.533c.045.12.14.216.261.261l1.48.556c.65.243.999.937.826 1.594l-.042.13l-.688 1.523a.446.446 0 0 0 0 .37l.654 1.44a1.34 1.34 0 0 1-.544 1.71l-.153.077l-1.533.576a.447.447 0 0 0-.26.261l-.556 1.48a1.34 1.34 0 0 1-1.595.826l-.13-.042l-1.523-.688a.446.446 0 0 0-.37 0l-1.439.654a1.34 1.34 0 0 1-1.71-.544l-.077-.153l-.577-1.533a.447.447 0 0 0-.261-.26l-1.48-.556a1.34 1.34 0 0 1-.826-1.595l.042-.13l.689-1.523a.447.447 0 0 0 0-.37L1.52 6.375a1.34 1.34 0 0 1 .543-1.71l.153-.077L3.75 4.01a.447.447 0 0 0 .261-.261l.556-1.48a1.34 1.34 0 0 1 1.594-.826l.13.042l1.523.689a.447.447 0 0 0 .37 0l1.44-.654a1.34 1.34 0 0 1 1.71.543Zm-5.931.52l-.555 1.48a1.34 1.34 0 0 1-.784.784l-1.48.555l-.098.051a.447.447 0 0 0-.152.552l.654 1.439c.16.352.16.756 0 1.108l-.66 1.454l-.027.091a.447.447 0 0 0 .283.497l1.48.556c.362.136.648.421.784.784l.555 1.48l.051.098c.12.174.352.242.552.151l1.439-.653a1.34 1.34 0 0 1 1.108 0l1.454.66l.091.026a.447.447 0 0 0 .497-.282l.556-1.48a1.34 1.34 0 0 1 .784-.784l1.48-.556l.098-.05a.447.447 0 0 0 .151-.552l-.653-1.44a1.34 1.34 0 0 1 0-1.108l.66-1.453l.026-.092a.447.447 0 0 0-.282-.497l-1.48-.555a1.34 1.34 0 0 1-.784-.784l-.556-1.48l-.05-.098a.447.447 0 0 0-.552-.152l-1.44.654a1.34 1.34 0 0 1-1.108 0l-1.44-.654l-.027-.012a.447.447 0 0 0-.575.262Zm1.574 6.762l3.186-3.64a.447.447 0 0 1 .725.514l-.053.073l-3.5 4a.447.447 0 0 1-.578.082l-.074-.06l-1.5-1.5a.447.447 0 0 1 .562-.689l.07.057l1.162 1.163l3.186-3.64l-3.186 3.64Z" /></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className='text-red-500' viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M17.707 7.707a1 1 0 0 0-1.414-1.414L12 10.586L7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 1 0 1.414-1.414L13.414 12l4.293-4.293Z" clip-rule="evenodd" /></svg>
                            }

                        </div>
                    </div>
                    <div className='col-span-full'>
                        <label className='text-xs text-gray-500 font-medium' htmlFor="bio">Votre biographie</label>
                        <textarea name="bio" id="" rows={3} value={formUser.bio}
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

export default ProfilForm;

