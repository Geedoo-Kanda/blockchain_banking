import Web3 from 'web3';
import SimpleWalletContract from '../../../build/contracts/SimpleWallet.json'; 
import { abi as SimpleWalletABI } from '../../../build/contracts/SimpleWallet.json'; 

// Initialiser Web3
const initSimpleWalletWeb3 = async () => {
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

// Initialiser le contrat
const initSimpleWalletContract = async (web3) => {
    if (web3) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleWalletContract.networks[networkId];
        return new web3.eth.Contract(
            SimpleWalletABI,
            deployedNetwork && deployedNetwork.address
        );
    }
};

// Initialiser les comptes
const initSimpleWalletAccounts = async (web3) => {
    if (web3) {
        return web3.eth.getAccounts();
    }
};

// Transférer des fonds
const transferFunds = async (contract, recipient, amount, description, accounts) => {
    if (contract) {
        const web3 = new Web3(window.ethereum);
        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
        await contract.methods.transferFunds(recipient, amountInWei, description).send({ from: accounts[0], value: amountInWei });
    }
};

// Obtenir les statistiques par adresse
const getStatisticsByAddress = async (contract, userAddress) => {
    if (userAddress !== null && contract) {
        return contract.methods.getStatisticsByAddress(userAddress).call();
    }
};

// Récupérer les transactions par adresse
const getTransactionsByAddress = async (contract, userAddress) => {
    if (userAddress !== null && contract) {
        return contract.methods.getTransactionsByAddress(userAddress).call();
    }
};

export {
    initSimpleWalletWeb3,
    initSimpleWalletContract,
    initSimpleWalletAccounts,
    transferFunds,
    getStatisticsByAddress,
    getTransactionsByAddress 
};
