pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/LEGO.sol";

contract FactoryLEGO is IFactory{
  function deploy() public returns(address) {
    return address(new LEGO());
  }

  function factoryName() public returns(string) {
    return "JoiCasino";
  }
  function factoryAmount() public returns(uint) {
    return 10;
  }
}