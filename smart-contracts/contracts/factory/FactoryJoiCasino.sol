pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/JoiCasino.sol";

contract FactoryJoiCasino is IFactory{
  mapping (address => address) contracts;

  function deploy() public returns(address) {
    contracts[msg.sender]=new Vulkan();
    return contracts[msg.sender];
  }

  function factoryName() public view returns(string) {
    return "JoiCasino";
  }
  function factoryAmount() public view returns(uint) {
    return 10;
  }
}