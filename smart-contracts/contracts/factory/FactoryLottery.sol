pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/Lottery.sol";

contract FactoryLottery is IFactory{
  mapping (address => address) contracts;
  mapping (address => address) superContracts;

  function deploy() public returns(address) {
    Lottery l = new Lottery();
    SuperContract s = new SuperContract();
    s.setOwner(address(l));
    contracts[msg.sender] = address(l);
    superContracts[msg.sender] = address(s);
    l.setSuperContract(address(s));
    return contracts[msg.sender];
  }

  function factoryName() public view returns(string) {
    return "Lottery";
  }
  function factoryAmount() public view returns(uint) {
    return 10;
  }
}
