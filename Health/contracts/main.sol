// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistration {
    enum Role { Patient, Hospital, Pharmacy, Supplier }

    struct Patient {
        string username;
        string medicalHistory;
    }

    struct Hospital {
        string username;
        string licenseNumber;
        string location;
    }

    struct Pharmacy {
        string username;
        string licenseNumber;
        string postalAddress;
    }

    struct Supplier {
        string username;
        string companyName;
        string contactInfo;
    }

    mapping(address => Role) public userRoles;
    mapping(address => Patient) public patients;
    mapping(address => Hospital) public hospitals;
    mapping(address => Pharmacy) public pharmacies;
    mapping(address => Supplier) public suppliers;

    event UserRegistered(address indexed userAddress, Role role, string username);

    function registerPatient(string memory _username, string memory _medicalHistory) public {
        require(bytes(_username).length > 0, "Username must be provided");

        patients[msg.sender] = Patient({
            username: _username,
            medicalHistory: _medicalHistory
        });

        userRoles[msg.sender] = Role.Patient;

        emit UserRegistered(msg.sender, Role.Patient, _username);
    }

    function registerHospital(
        string memory _username,
        string memory _licenseNumber,
        string memory _location
    ) public {
        require(bytes(_username).length > 0, "Username must be provided");
        require(bytes(_licenseNumber).length > 0, "License number must be provided");

        hospitals[msg.sender] = Hospital({
            username: _username,
            licenseNumber: _licenseNumber,
            location: _location
        });

        userRoles[msg.sender] = Role.Hospital;

        emit UserRegistered(msg.sender, Role.Hospital, _username);
    }

    function registerPharmacy(
        string memory _username,
        string memory _licenseNumber,
        string memory _postalAddress
    ) public {
        require(bytes(_username).length > 0, "Username must be provided");
        require(bytes(_licenseNumber).length > 0, "License number must be provided");
        require(bytes(_postalAddress).length > 0, "Address must be provided");

        pharmacies[msg.sender] = Pharmacy({
            username: _username,
            licenseNumber: _licenseNumber,
            postalAddress: _postalAddress
        });

        userRoles[msg.sender] = Role.Pharmacy;

        emit UserRegistered(msg.sender, Role.Pharmacy, _username);
    }

    function registerSupplier(
        string memory _username,
        string memory _companyName,
        string memory _contactInfo
    ) public {
        require(bytes(_username).length > 0, "Username must be provided");
        require(bytes(_companyName).length > 0, "Company name must be provided");

        suppliers[msg.sender] = Supplier({
            username: _username,
            companyName: _companyName,
            contactInfo: _contactInfo
        });

        userRoles[msg.sender] = Role.Supplier;

        emit UserRegistered(msg.sender, Role.Supplier, _username);
    }

    function getUserDetails(address _userAddress)
        public
        view
        returns (
            Role,
            Patient memory,
            Hospital memory,
            Pharmacy memory,
            Supplier memory
        )
    {
        return (
            userRoles[_userAddress],
            patients[_userAddress],
            hospitals[_userAddress],
            pharmacies[_userAddress],
            suppliers[_userAddress]
        );
    }
}
