pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/LEGO.sol";

contract FactoryLEGO is IFactory{
  mapping (address => address) contracts;

  function deploy() public returns(address) {
    contracts[msg.sender]=new LEGO();
    return contracts[msg.sender];
  }

  function factoryName() public view returns(string) {
    return "LEGO";
  }
  function factoryAmount() public view returns(uint) {
    return 10;
  }
}