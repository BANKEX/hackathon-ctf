pragma solidity ^0.4.24;

import "./IFactory.sol";
import "../tasks/BrokenVisaCard.sol";
import "./IInstance.sol";

contract FactoryBrokenVisaCard {
  mapping(address => address) public contracts;
  
  function deploy() public returns (address) {
    address bvc = new BrokenVisaCard();
    contracts[msg.sender] = bvc;
    return contracts[msg.sender];
  }
  
  function factoryName() public view returns (string) {
    return "BrokenVisaCard";
  }
  
  function factoryAmount() public view returns (uint) {
    return 10;
  }
  
}
