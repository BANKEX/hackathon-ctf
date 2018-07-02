pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/Kamikaze.sol";

contract FactoryKamikaze is IFactory {
  mapping (address => address) public contracts;

  function deploy() public returns(address) {
    address basicToken = new BasicToken();
    address bank = new Bank(basicToken, msg.sender);
    IERC20(basicToken).approve(bank, 2**255-1);
    address bankAccount = IBank(bank).accounts(msg.sender);
    contracts[msg.sender] = bankAccount;
    return contracts[msg.sender];
  }

  function factoryName() public view returns(string) {
    return "Kamikaze";
  }

  function factoryAmount() public view returns(uint) {
    return 10;
  }
}