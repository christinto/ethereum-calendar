pragma solidity ^0.4.18;

contract Calendar {
  // this is the address of the user that instantiates the calendar contract
  address owner;
  // modifier to ensure calendar functions only accessible to owner of calendar
  modifier ownerOnly {
    if (msg.sender == owner) {
      _;
    } else {
      revert();
    }
  }
  // Constructor
    function  Calendar (address own) public {
      owner = own;
    }
}
