pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/Dividends.sol";

contract FactoryDividends is IFactory{
  mapping (address => address) contracts;
  mapping (address=>address) calc;

  function deploy() public returns(address) {
    DividendsCalculator _calc = new DividendsCalculator();
    Dividends _machine = new Dividends(address(_calc));
    _calc.setMachine(address(_machine));
    calc[msg.sender] = _calc;
    contracts[msg.sender] = _machine;
    return contracts[msg.sender];
  }

  function factoryName() public view returns(string) {
    return "Dividends";
  }
  
  function factoryAmount() public view returns(uint) {
    return 10;
  }
}
