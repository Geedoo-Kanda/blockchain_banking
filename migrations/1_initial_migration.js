const UserProfile = artifacts.require("UserProfile");
const SimpleWallet = artifacts.require("SimpleWallet");
const Administration = artifacts.require("Administration");

module.exports = async function (deployer) {
   await deployer.deploy(UserProfile);
   // Récupérer l'instance déployée de UserProfile
   const userProfile = await UserProfile.deployed();

   await deployer.deploy(SimpleWallet);
   // Récupérer l'instance déployée de SimpleWallet
   const simpleWallet = await SimpleWallet.deployed();

   // Déployer Administration en passant l'adresse de SimpleWallet et UserProfile
   await deployer.deploy(Administration, simpleWallet.address, userProfile.address);
};
