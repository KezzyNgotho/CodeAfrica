// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HealthcareSystem {
    // User types
    enum UserType { Patient, Hospital, Pharmacy, Supplier }

    // User struct
    struct User {
        address userAddress;
        string name;
        UserType userType;
        uint256 id;
    }

    // Patient struct
    struct Patient {
        string healthRecords;
        uint256[] prescriptionIds;
    }

    // Medicine struct
    struct Medicine {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
    }

    // User mappings
    mapping(address => User) public users;
    mapping(address => Patient) public patients;
    mapping(address => Medicine[]) public supplierInventories;
    mapping(address => Medicine[]) public pharmacyInventories;

    // User ID counter
    uint256 public userIdCounter;

    // Medicine ID counter
    uint256 public medicineIdCounter;

    // Maximum number of free orders for hospitals
    uint256 public maxHospitalOrders;

    // Hospital order count
    mapping(address => uint256) public hospitalOrderCount;

    // Pharmacy markup percentage
    uint256 public constant PHARMACY_MARKUP_PERCENTAGE = 10;

    // Register a new user
    function registerUser(string memory _name, UserType _userType) public {
        require(users[msg.sender].userAddress == address(0), "User already registered");
        users[msg.sender] = User(msg.sender, _name, _userType, userIdCounter);
        if (_userType == UserType.Patient) {
            patients[msg.sender] = Patient("", new uint256[](0));
        }
        userIdCounter++;
    }

    // Update user details
    function updateUserDetails(string memory _name) public {
        require(users[msg.sender].userAddress != address(0), "User not registered");
        users[msg.sender].name = _name;
    }

    // Add medicine to supplier inventory
    function addMedicine(string memory _name, uint256 _price, uint256 _quantity) public {
        require(users[msg.sender].userType == UserType.Supplier, "Only suppliers can add medicine");
        uint256 medicineId = medicineIdCounter;
        supplierInventories[msg.sender].push(Medicine(medicineId, _name, _price, _quantity));
        medicineIdCounter++;
    }

    // Update medicine details
    function updateMedicineDetails(uint256 _id, uint256 _price, uint256 _quantity) public {
        require(users[msg.sender].userType == UserType.Supplier, "Only suppliers can update medicine details");
        Medicine[] storage inventory = supplierInventories[msg.sender];
        for (uint256 i = 0; i < inventory.length; i++) {
            if (inventory[i].id == _id) {
                inventory[i].price = _price;
                inventory[i].quantity = _quantity;
                break;
            }
        }
    }

    // Get medicine details
    function getMedicineDetails(uint256 _id) public view returns (string memory, uint256, uint256) {
        require(users[msg.sender].userType == UserType.Supplier || users[msg.sender].userType == UserType.Patient || users[msg.sender].userType == UserType.Pharmacy || users[msg.sender].userType == UserType.Hospital, "Only authorized users can view medicine details");
        Medicine[] storage inventory = supplierInventories[msg.sender];
        for (uint256 i = 0; i < inventory.length; i++) {
            if (inventory[i].id == _id) {
                return (inventory[i].name, inventory[i].price, inventory[i].quantity);
            }
        }
        revert("Medicine not found");
    }

    // Update patient health records
    function updateHealthRecords(string memory _records) public {
        require(users[msg.sender].userType == UserType.Patient, "Only patients can update health records");
        patients[msg.sender].healthRecords = _records;
    }

    // Get patient health records
    function getHealthRecords() public view returns (string memory) {
        require(users[msg.sender].userType == UserType.Patient, "Only patients can view health records");
        return patients[msg.sender].healthRecords;
    }

    // Order medicine from supplier (for pharmacies and hospitals)
    function orderFromSupplier(address _supplierAddress, uint256 _medicineId, uint256 _quantity) public {
        require(users[msg.sender].userType == UserType.Pharmacy || users[msg.sender].userType == UserType.Hospital, "Only pharmacies and hospitals can order from suppliers");
        Medicine[] storage supplierInventory = supplierInventories[_supplierAddress];
        for (uint256 i = 0; i < supplierInventory.length; i++) {
            if (supplierInventory[i].id == _medicineId) {
                require(supplierInventory[i].quantity >= _quantity, "Insufficient medicine quantity");
                if (users[msg.sender].userType == UserType.Hospital) {
                    require(hospitalOrderCount[msg.sender] < maxHospitalOrders, "Maximum hospital orders reached");
                    hospitalOrderCount[msg.sender]++;
                    supplierInventory[i].quantity -= _quantity;
                    pharmacyInventories[msg.sender].push(Medicine(_medicineId, supplierInventory[i].name, supplierInventory[i].price, _quantity));
                } else {
                    uint256 markupPrice = (supplierInventory[i].price * (100 + PHARMACY_MARKUP_PERCENTAGE)) / 100;
                    supplierInventory[i].quantity -= _quantity;
                    pharmacyInventories[msg.sender].push(Medicine(_medicineId, supplierInventory[i].name, markupPrice, _quantity));
                }
                break;
            }
        }
        revert("Medicine not found");
    }

    // Buy medicine from pharmacy (for patients)
    function buyFromPharmacy(address _pharmacyAddress, uint256 _medicineId, uint256 _quantity) public payable {
        require(users[msg.sender].userType == UserType.Patient, "Only patients can buy medicine");
        Medicine[] storage pharmacyInventory = pharmacyInventories[_pharmacyAddress];
        for (uint256 i = 0; i < pharmacyInventory.length; i++) {
            if (pharmacyInventory[i].id == _medicineId) {
                require(pharmacyInventory[i].quantity >= _quantity, "Insufficient medicine quantity");
                uint256 totalPrice = pharmacyInventory[i].price * _quantity;
                require(msg.value >= totalPrice, "Insufficient payment");
                pharmacyInventory[i].quantity -= _quantity;
                patients[msg.sender].prescriptionIds.push(_medicineId);
                // Transfer payment to the pharmacy
                break;
            }
        }
        revert("Medicine not found");
    }

    // Get patient prescriptions
    function getPatientPrescriptions() public view returns (uint256[] memory) {
        require(users[msg.sender].userType == UserType.Patient, "Only patients can view prescriptions");
        return patients[msg.sender].prescriptionIds;
    }

    // Set maximum hospital orders
    function setMaxHospitalOrders(uint256 _maxOrders) public {
        require(msg.sender == address(this), "Only contract owner can set maximum hospital orders");
        maxHospitalOrders = _maxOrders;
    }
}