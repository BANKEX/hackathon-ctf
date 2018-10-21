pragma solidity ^0.4.23;

import "./IFactory.sol";
import "../tasks/CALLapse.sol";

contract FactoryCALLapse is IFactory {
  mapping (address => address) public contracts;
  mapping(address=>address) proxylibs;
  mapping(address=>address) versions;
  

  function deploy() public returns(address) {
    VersionOne v = new VersionOne();
    CALLapse c = new CALLapse(address(v));
    address p = c.getProxyAddress();
    contracts[msg.sender] = address(c);
    proxylibs[msg.sender] = p;
    versions[msg.sender] = address(v);
    
    return contracts[msg.sender];
  }

  function factoryName() public view returns(string) {
    return "CALLapse";
  }

  function factoryAmount() public view returns(uint) {
    return 10;
  }
}
