pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/FastFlow.sol";
import "./IInstance.sol";

contract FactoryFastFlow is IFactory{
  mapping (address => address) contracts;

  function deploy() public returns(address) {
    contracts[msg.sender]=new Bank();
    return contracts[msg.sender];
  }

  function factoryName() public view returns(string) {
    return "FastFlow";
  }
  function factoryAmount() public view returns(uint) {
    return 10;
  }
}