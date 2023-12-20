// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "./UserProfile.sol";
import "./SimpleWallet.sol";

contract Administration {
    address public owner;
    mapping(address => bool) public administrators;
    UserProfile public userProfileContract;
    SimpleWallet public simpleWalletContract;

    event AdministratorAdded(address indexed administrator);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(address _userProfileContract, address _simpleWalletContract) public {
        owner = msg.sender;
        administrators[msg.sender] = true;
        userProfileContract = UserProfile(_userProfileContract);
        simpleWalletContract = SimpleWallet(_simpleWalletContract);
    }

    function addAdministrator(address newAdministrator) public onlyOwner {
        require(newAdministrator != address(0), "Invalid administrator address");
        administrators[newAdministrator] = true;

        emit AdministratorAdded(newAdministrator);
    }

    function isAdministrator(address account) public view returns (bool) {
        return administrators[account];
    }

    function getAllUserProfiles() public view returns (UserProfile.Profile[] memory) {
        require(isAdministrator(msg.sender), "Caller is not an administrator");

        return userProfileContract.getAllProfiles();
    }

    function getAllTransactions() public view returns (SimpleWallet.Transaction[] memory) {
        require(isAdministrator(msg.sender), "Caller is not an administrator");

        return simpleWalletContract.getAllTransactions();
    }

    function getNetworkStatistics() public view returns (uint256 totalTransactions, uint256 totalSent, uint256 totalReceived) {
        require(isAdministrator(msg.sender), "Caller is not an administrator");

        SimpleWallet.Transaction[] memory transactions = simpleWalletContract.getAllTransactions();

        for (uint256 i = 0; i < transactions.length; i++) {
            totalTransactions++;
            totalSent += transactions[i].amount;
            totalReceived += transactions[i].amount;
        }

        return (totalTransactions, totalSent, totalReceived);
    }
    
}
