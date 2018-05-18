pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/JoiCasino.sol";

contract FactoryJoiCasino is IFactory{
  function deploy() public returns(address) {
    return address(new Vulkan());
  }

  function factoryName() public returns(string) {
    return "JoiCasino";
  }
  function factoryAmount() public returns(uint) {
    return 10;
  }
}