// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract UserProfile {
    struct Profile {
        string username;
        uint256 age;
        string email;
        string photo;
        string bio;
        string passwordHash;
        address userAddress;
    }

    mapping(address => Profile) public profiles;
    address[] public allUsers;

    event ProfileCreated(
        address indexed user,
        string username,
        uint256 age,
        string email
    );

    function createProfile(
        string memory username,
        uint256 age,
        string memory email,
        string memory photo,
        string memory bio,
        string memory password
    ) public {
        require(bytes(username).length > 0, "Username cannot be empty");
        require(age > 0, "Age must be greater than 0");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(
            profiles[msg.sender].age == 0,
            "Profile already exists for this address"
        );

        string memory passwordHash = hashPassword(password);

        Profile memory newProfile = Profile({
            username: username,
            age: age,
            email: email,
            photo: photo,
            bio: bio,
            passwordHash: passwordHash,
            userAddress: msg.sender
        });

        profiles[msg.sender] = newProfile;
        allUsers.push(msg.sender);

        emit ProfileCreated(msg.sender, username, age, email);
    }

    function getProfileByAddress(
        address userAddress
    ) public view returns (Profile memory) {
        require(
            profiles[userAddress].age > 0,
            "Profile does not exist for this address"
        );
        return profiles[userAddress];
    }

    function getAllProfiles() public view returns (Profile[] memory) {
        require(allUsers.length > 0, "Aucun profil disponible");

        Profile[] memory allUserProfiles = new Profile[](allUsers.length);

        for (uint256 i = 0; i < allUsers.length; i++) {
            address userAddress = allUsers[i];

            allUserProfiles[i] = Profile({
                age: profiles[userAddress].age,
                bio: profiles[userAddress].bio,
                email: profiles[userAddress].email,
                passwordHash: profiles[userAddress].passwordHash,
                photo: profiles[userAddress].photo,
                username: profiles[userAddress].username,
                userAddress: userAddress
            });
        }

        return allUserProfiles;
    }

    function hashPassword(
        string memory password
    ) internal pure returns (string memory) {
        return string(abi.encodePacked(keccak256(abi.encodePacked(password))));
    }

    function comparePasswords(
        string memory inputPassword,
        string memory storedPasswordHash
    ) internal pure returns (bool) {
        return
            keccak256(abi.encodePacked(inputPassword)) ==
            keccak256(abi.encodePacked(storedPasswordHash));
    }
}
