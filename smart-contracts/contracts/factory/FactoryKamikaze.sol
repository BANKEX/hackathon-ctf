pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/Kamikaze.sol";

contract FactoryKamikaze is IFactory {
  mapping (address => address) public contracts;

  function deploy() public returns(address) {
    address basicToken = new BasicToken();
    address bank = new Bank(basicToken, tx.origin);
    IERC20(basicToken).transfer(bank, 2**256-1);
    address bankAccount = IBank(bank).accounts(tx.origin);
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