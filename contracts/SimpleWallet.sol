// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract SimpleWallet {
    event FundsTransferred(address indexed from, address indexed to, uint256 amount, string description);

    struct Transaction {
        address sender;
        address recipient;
        uint256 amount;
        string description;
    }

    Transaction[] public transactions;

    mapping(address => uint256) public sentBalance;
    mapping(address => uint256) public receivedBalance;

    function transferFunds(address payable recipient, uint256 amount, string memory description) public payable {
        require(recipient != address(0), "Invalid recipient address");
        require(msg.value >= amount, "Insufficient funds sent with the transaction");

        recipient.transfer(amount);

        Transaction memory newTransaction = Transaction({
            sender: msg.sender,
            recipient: recipient,
            amount: amount,
            description: description
        });

        transactions.push(newTransaction);

        // Update sent and received balances
        sentBalance[msg.sender] += amount;
        receivedBalance[recipient] += amount;

        emit FundsTransferred(msg.sender, recipient, amount, description);
    }

    function getTransactionsByAddress(address userAddress) public view returns (Transaction[] memory) {
        require(userAddress != address(0), "Invalid user address");

        uint256 userTransactionCount = 0;

        // Count the number of transactions for the given address
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].sender == userAddress || transactions[i].recipient == userAddress) {
                userTransactionCount++;
            }
        }

        // Create an array to store the transactions of the given address
        Transaction[] memory userTransactions = new Transaction[](userTransactionCount);
        uint256 index = 0;

        // Populate the array with transactions of the given address
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].sender == userAddress || transactions[i].recipient == userAddress) {
                userTransactions[index] = transactions[i];
                index++;
            }
        }

        return userTransactions;
    }

    function getStatisticsByAddress(address userAddress) public view returns (uint256, uint256, uint256, uint256) {
        require(userAddress != address(0), "Invalid user address");

        uint256 totalTransactions = transactions.length;
        uint256 sentAmount = sentBalance[userAddress];
        uint256 receivedAmount = receivedBalance[userAddress];
        uint256 currentBalance = address(userAddress).balance;

        return (totalTransactions, sentAmount, receivedAmount, currentBalance);
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}

