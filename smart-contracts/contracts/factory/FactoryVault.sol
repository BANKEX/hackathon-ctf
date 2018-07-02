pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/Vault.sol";

contract VaultFactory {
  
  mapping (address => address) contracts;
  
  function deploy() public returns(address) {
    contracts[msg.sender] = new Vault();
    return contracts[msg.sender];
  }
  
  function factoryName() public view returns(string) {
    return "Vault";
  }
  
  function factoryAmount() public view returns(uint) {
    return 10;
  }
  
}