import Web3 from 'web3';
import AdministrationContract from './Administration.json'; 
import { abi as AdministrationABI } from './Administration.json'; 

// Initialiser Web3
const initAdministrationWeb3 = async () => {
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

// Initialiser le contrat d'administration
const initAdministrationContract = async (web3) => {
    if (web3) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = AdministrationContract.networks[networkId];
        return new web3.eth.Contract(
            AdministrationABI,
            deployedNetwork && deployedNetwork.address
        );
    }
};

// Initialiser les comptes
const initAdministrationAccounts = async (web3) => {
    if (web3) {
        return web3.eth.getAccounts();
    }
};

// Ajouter un administrateur
const addAdministrator = async (contract, newAdministrator, accounts) => {
    try {
        await contract.methods.addAdministrator(newAdministrator).send({ from: accounts[0] });
        console.log(`Administrator ${newAdministrator} added successfully.`);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Vérifier si une adresse est un administrateur
const isAdministrator = async (contract, addressToCheck) => {
    try {
        const result = await contract.methods.isAdministrator(addressToCheck).call();
        console.log(`Is ${addressToCheck} an administrator? ${result}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Fonction pour récupérer tous les profils d'utilisateurs
const getAllUserProfiles = async (contract, accounts) => {
    try {
        const profiles = await contract.methods.getAllUserProfiles().call({ from: accounts[0] });
        console.log('User Profiles:', profiles);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Fonction pour récupérer toutes les transactions
const getAllTransactions = async (contract, accounts) => {
    try {
        const transactions = await contract.methods.getAllTransactions().call({ from: accounts[0] });
        console.log('Transactions:', transactions);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Fonction pour récupérer les statistiques du réseau
const getNetworkStatistics = async (contract, accounts) => {
    try {
        const statistics = await contract.methods.getNetworkStatistics().call({ from: accounts[0] });
        console.log('Network Statistics:', statistics);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

export {
    initAdministrationWeb3,
    initAdministrationContract,
    initAdministrationAccounts,
    addAdministrator,
    isAdministrator,
    getAllUserProfiles,
    getAllTransactions,
    getNetworkStatistics 
};
