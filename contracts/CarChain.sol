//SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract CarChain {
    //set an owner of contract
    address public immutable i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    struct Car {
        uint256 id;
        string make;
        string model;
        string year;
        string color;
        string licensePlate;
        uint256 price;
        uint256 minDeposit; //minimum deposit to rent the car
        bool available;
        address ownerAddress;
    }

    struct Owner {
        address payable walletAddress;
        string firstName;
        string lastName;
        uint256 balance;
        uint256[] carIds;
    }

    struct Renter {
        address payable walletAddress;
        string firstName;
        string lastName;
        bool canRent;
        uint256 rentedCarId;
        uint256 balance;
        uint256 reservedBalance; // balance that is reserved for the rent's deposit
        uint256 rentStart;
        uint256 rentEnd;
    }

    mapping(address => Renter) public renters;
    mapping(address => Owner) public owners;
    mapping(uint256 => Car) public cars;
    uint256[] public carIds;

    //        --------------Owner functions --------------
    function addOwner(
        address payable walletAddress,
        string memory firstName,
        string memory lastName
    ) public {
        owners[walletAddress] = Owner(
            walletAddress,
            firstName,
            lastName,
            0,
            new uint256[](0)
        );
    }

    //generate id by hashing license plate
    uint256 private lastCarId = 0;

    function generateCarId() private returns (uint256) {
        lastCarId += 1;
        return lastCarId;
    }

    function addCar(
        string memory make,
        string memory model,
        string memory year,
        string memory color,
        string memory licensePlate,
        uint256 price,
        uint256 minDeposit
    ) public {
        uint256 carId = generateCarId();
        address ownerAddress = msg.sender;
        cars[carId] = Car(
            carId,
            make,
            model,
            year,
            color,
            licensePlate,
            price,
            minDeposit,
            true,
            ownerAddress
        );
        owners[ownerAddress].carIds.push(carId);
        carIds.push(carId);
    }

    function getOwnerCars(
        address ownerAddress
    ) public view returns (uint256[] memory) {
        return owners[ownerAddress].carIds;
    }

    function getOwnerBalance(
        address ownerAddress
    ) public view returns (uint256) {
        return owners[ownerAddress].balance;
    }

    function ownerWithdraw(uint256 amount) public payable {
        address ownerAddress = msg.sender;
        uint256 withdrawable = owners[ownerAddress].balance;
        require(amount <= withdrawable, "You cant withdraw more than you have");

        bool sent = payable(msg.sender).send(amount);
        require(sent, "Failed to send Ether");
        owners[ownerAddress].balance -= amount;
    }

    //          -------------- Renter functions --------------
    function addRenter(
        address payable walletAddress,
        string memory firstName,
        string memory lastName
    ) public {
        renters[walletAddress] = Renter(
            walletAddress,
            firstName,
            lastName,
            true,
            0,
            0,
            0,
            0,
            0
        );
    }

    function getAllCarIds() public view returns (uint256[] memory) {
        return carIds;
    }

    // deposit eth in the rental account in the sc
    function deposit(address walletAddress) public payable {
        renters[walletAddress].balance += msg.value;
    }

    // withdraw deposited eth (minus due amount if any)
    function renterWithdraw(uint256 amount) public payable {
        address walletAddress = msg.sender;
        uint256 withdrawable = renters[walletAddress].balance -
            renters[walletAddress].reservedBalance;
        require(amount <= withdrawable, "You cant withdraw more than you have");

        bool sent = payable(msg.sender).send(amount);
        require(sent, "Failed to send Ether");
        renters[walletAddress].balance -= amount;
    }

    // pickUp a car
    function pickUp(uint256 carId) public {
        address renterAddress = msg.sender;
        //check if the car is available
        require(cars[carId].available == true, "Car is not available");
        require(
            renters[renterAddress].canRent == true,
            "You can not rent at this time"
        );
        require(
            renters[renterAddress].balance >= cars[carId].minDeposit,
            "your deposit is too low"
        );

        renters[renterAddress].rentStart = block.timestamp;
        renters[renterAddress].canRent = false;
        renters[renterAddress].rentedCarId = carId;
        renters[renterAddress].reservedBalance = cars[carId].minDeposit;
        cars[carId].available = false;
    }

    // dropOff the car
    function dropOff() public {
        address walletAddress = msg.sender;
        uint256 carId = renters[walletAddress].rentedCarId;
        require(
            renters[walletAddress].rentedCarId != 0,
            "you have to rent a car first"
        );
        renters[walletAddress].rentEnd = block.timestamp;
        //set amount of due
        payDue(walletAddress, carId);

        renters[walletAddress].canRent = true;
        renters[walletAddress].reservedBalance = 0;
        renters[walletAddress].rentedCarId = 0;
        cars[carId].available = true;
    }

    function renterTimespan(
        uint256 start,
        uint256 end
    ) internal pure returns (uint256) {
        return end - start;
    }

    function getRentDurationMinutes(
        address walletAddress
    ) public view returns (uint256) {
        require(
            renters[walletAddress].rentedCarId != 0,
            "you have to rent a car first"
        );
        uint256 timespan = renterTimespan(
            renters[walletAddress].rentStart,
            renters[walletAddress].rentEnd
        );
        uint256 timespanInMinutes = timespan / 60;
        return timespanInMinutes;
    }

    //get renter's balance
    function balanceOfRenter(
        address walletAddress
    ) public view returns (uint256) {
        return renters[walletAddress].balance;
    }

    function payDue(address walletAddress, uint256 carId) internal {
        uint256 timespanMinutes = getRentDurationMinutes(walletAddress);
        uint256 due = timespanMinutes * cars[carId].price;
        require(
            renters[walletAddress].balance >= due,
            "You don't have enought funds to cover payment. Please make a deposit."
        );
        renters[walletAddress].balance -= due;
        address ownerAddress = cars[carId].ownerAddress;
        owners[ownerAddress].balance += due;
    }

    function canRentCar(address walletAddress) public view returns (bool) {
        return renters[walletAddress].canRent;
    }

    //         -------------- Owner functions --------------
    // get contract balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
