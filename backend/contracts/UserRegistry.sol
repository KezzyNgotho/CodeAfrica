pragma solidity ^0.8.0;

contract UserRegistry {
    // Possible user roles
    enum Role { Patient, Hospital, Pharmacist, Supplier }

    // User struct to store details on-chain
    struct User {
        bytes32 username;
        bytes32 passwordHash; // Store only the hash of the password
        Role role;
        bytes32 offchainDataHash; // Hash of the off-chain data
    }

    // Mapping of addresses to users
    mapping(address => User) public users;

    // Event to notify about user registration
    event UserRegistered(address indexed userAddress, Role indexed role);

    // Modifier to restrict functions to registered users
    modifier onlyRegistered() {
        require(users[msg.sender].username.length > 0, "User not registered");
        _;
    }

    // Function to register a new user
    function register(
        bytes32 username,
        bytes32 password,
        Role role,
        // User-specific data based on role
        bytes calldata name,
        bytes calldata dateOfBirth,
        bytes calldata medicalHistory, // Partially anonymized if needed (off-chain implementation)
        bytes calldata licenseNumber,  // Hospital/Pharmacist
        bytes calldata address_,      // Hospital
        bytes calldata contactInfo,    // Hospital
        bytes calldata pharmacyAffiliation,// Pharmacist
       bytes calldata companyName,   // Supplier
        bytes calldata productInfo;   // Supplier
    ) public {
        require(users[msg.sender].username.length == 0, "User already registered");
        // Hash the password for security (never store plain text passwords)
        bytes memory offchainData;
        if (role == Role.Patient) {
            offchainData = abi.encodePacked(name, dateOfBirth, partiallyAnonymize(medicalHistory));
        } else if (role == Role.Hospital) {
            offchainData = abi.encodePacked(licenseNumber, address_, contactInfo);
        } else if (role == Role.Pharmacist) {
            offchainData = abi.encodePacked(licenseNumber, pharmacyAffiliation);
        } else if (role == Role.Supplier) {
            offchainData = abi.encodePacked(companyName, productInfo);
        } else {
            revert("Invalid role");
        }
        users[msg.sender] = User(username, keccak256(abi.encodePacked(password)), role, keccak256(offchainData));
        // Store sensitive data securely off-chain (implementation details depend on your chosen solution)
        storeOffchainData(msg.sender, offchainData);
        emit UserRegistered(msg.sender, role);
    }

    // Function to check if a user is registered with a specific role (usable only by registered users)
    function isUserOfRole(Role role) public onlyRegistered view returns (bool) {
        return users[msg.sender].role == role;
    }

    // Example function accessible only to hospitals (implement similar functions for other roles)
    function hospitalFunction() public onlyRegistered {
        require(isUserOfRole(Role.Hospital), "Only hospitals can call this function");
        // Hospital-specific logic here
    }

    // Function to retrieve off-chain data (implementation depends on your chosen solution)
    function retrieveOffchainData(address userAddress) public onlyRegistered view returns (bytes memory) {
        require(userAddress == msg.sender, "Can only retrieve your own data");
        // Validate user role and access rights before retrieving data
        // (implement logic to retrieve data from your secure off-chain storage)
        return retrieveDataFromOffchainStorage(userAddress);
    }

    // Placeholder functions for off-chain data storage (replace with your actual implementation)
    function storeOffchainData(address userAddress, bytes calldata data) internal virtual {}
    function retrieveDataFromOffchainStorage(address userAddress) internal virtual view returns (bytes memory) {
        revert("Not implemented: Use a secure off-chain storage solution");
    }

    // Function to partially anonymize medical history (replace with your implementation)
    function partiallyAnonymize(bytes calldata medicalHistory) internal pure returns (bytes memory) {
        // This is a placeholder. You'll need to implement logic to anonymize specific parts of the medical history.
        // For example, you might remove patient identifiers (name, address) or use hashing for sensitive data.
        return medicalHistory;
    }
}
