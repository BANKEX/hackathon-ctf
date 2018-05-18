pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/FastFlow.sol";

contract FactoryFastFlow is IFactory{
  function deploy() public returns(address) {
    return address(new Bank());
  }

  function factoryName() public returns(string) {
    return "FastFlow";
  }
  function factoryAmount() public returns(uint) {
    return 10;
  }
}