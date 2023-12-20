import Web3 from 'web3';
import UserProfileContract from '../../../build/contracts/UserProfile.json';
import { abi as UserProfileABI } from '../../../build/contracts/UserProfile.json';

const initUserProfileWeb3 = async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.enable();
            return new Web3(window.ethereum);
        } catch (error) {
            console.error('Erreur lors de l\'activation de MetaMask :', error);
        }
    } else if (window.web3) {
        return new Web3(window.web3.currentProvider);
    } else {
        console.error('Aucun fournisseur Web3 détecté. Veuillez utiliser MetaMask ou Mist.');
    }
};

const initUserProfileContract = async (web3) => {
    if (web3) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = UserProfileContract.networks[networkId];
        return new web3.eth.Contract(
            UserProfileABI,
            deployedNetwork && deployedNetwork.address
        );
    }
};

const initUserProfileAccounts = async (web3) => {
    if (web3) {
        return web3.eth.getAccounts();
    }
};

const createProfile = async (contract, newProfile, accounts) => {
    if (contract) {
        const { username, age, email, photo, bio, password } = newProfile;
        await contract.methods.createProfile(username, age, email, photo, bio, password).send({ from: accounts[0] });
    }
};

const getProfileByAddress = async (contract, userAddress) => {
    if (userAddress !== null && contract) {
        return contract.methods.getProfileByAddress(userAddress).call();
    }
};

const getAllUserProfiles = async (contract) => {
    try {
        const profiles = await contract.methods.getAllProfiles().call();
        return profiles;
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const comparePasswords = async (contract, plainPassword, hashedPassword) => {
    if (contract) {
        try {
            return await contract.methods.comparePasswords(plainPassword, hashedPassword).call();
        } catch (error) {
            console.error('Error comparing passwords:', error.message);
            return false;
        }
    }
};

export {
    initUserProfileWeb3,
    initUserProfileContract,
    initUserProfileAccounts,
    createProfile,
    getProfileByAddress,
    comparePasswords,
    getAllUserProfiles
};
