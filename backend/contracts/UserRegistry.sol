// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract UserRegistry {
    enum Role { Patient, Hospital, Pharmacist, Supplier }

    struct User {
        bytes32 username;
        bytes32 passwordHash;
        Role role;
        bytes32 offchainDataHash;
    }

    mapping(address => User) public users;
    mapping(bytes32 => address) public usernameToAddress; // New mapping to store the address corresponding to a username

    event UserRegistered(address indexed userAddress, Role indexed role);

    modifier onlyRegistered() {
        require(users[msg.sender].username.length > 0, "User not registered");
        _;
    }

    function register(
        bytes32 username,
        bytes32 password,
        Role role,
        bytes calldata data
    ) public {
        require(users[msg.sender].username.length == 0, "User already registered");
        require(usernameToAddress[username] == address(0), "Username already exists"); // Ensure username is unique

        bytes32 offchainDataHash;
        if (role == Role.Patient || role == Role.Hospital) {
            offchainDataHash = keccak256(data);
        } else if (role == Role.Pharmacist || role == Role.Supplier) {
            offchainDataHash = keccak256(abi.encodePacked(data));
        } else {
            revert("Invalid role");
        }

        users[msg.sender] = User(username, keccak256(abi.encodePacked(password)), role, offchainDataHash);
        usernameToAddress[username] = msg.sender; // Store the address corresponding to the username
        storeOffchainData(msg.sender, abi.encodePacked(offchainDataHash));

        emit UserRegistered(msg.sender, role);
    }

    function authenticate(bytes32 username, bytes32 password) public view returns (bool) {
        address userAddress = usernameToAddress[username];
        if (userAddress == address(0)) {
            return false; // User not found
        }
        return users[userAddress].passwordHash == keccak256(abi.encodePacked(password)); // Check password hash
    }

    function isUserOfRole(Role role) public onlyRegistered view returns (bool) {
        return users[msg.sender].role == role;
    }

    function hospitalFunction() public onlyRegistered {
        require(isUserOfRole(Role.Hospital), "Only hospitals can call this function");
        // Hospital-specific logic here
    }

    function retrieveOffchainData() public onlyRegistered view returns (bytes memory) {
        return retrieveDataFromOffchainStorage(msg.sender);
    }

    function storeOffchainData(address userAddress, bytes memory data) internal virtual {}
    function retrieveDataFromOffchainStorage(address userAddress) internal virtual view returns (bytes memory) {
        revert("Not implemented: Use a secure off-chain storage solution");
    }
}
