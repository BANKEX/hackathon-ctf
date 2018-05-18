pragma solidity ^0.4.23;


contract IRoot {
  function getLib(string _libName) public view returns(address);
}