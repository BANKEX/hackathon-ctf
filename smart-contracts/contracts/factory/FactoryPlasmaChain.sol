pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/PlasmaChain.sol";
import "./IInstance.sol";

contract FactoryPlasmaChain is IFactory{
  mapping (address => address) contracts;

  function deploy() public returns(address) {
    contracts[msg.sender] = new PlasmaChain();
    return contracts[msg.sender];
  }

  function factoryName() public view returns(string) {
    return "PlasmaChain";
  }
  function factoryAmount() public view returns(uint) {
    return 10;
  }
}
