pragma solidity ^0.4.24;

import "./IFactory.sol";
import "../tasks/DoubleTapVote.sol";
import "./IInstance.sol";

contract FactoryDoubleTapVote {
  mapping(address => address) public contracts;
  
  function deploy() public returns (address) {
    address libVerOne = new LibraryVersionOne();
    address libraryController = new LibraryController(libVerOne);
    address Vote = new DoubleTapVote(libraryController);
    contracts[msg.sender] = Vote;
    return contracts[msg.sender];
  }
  
  function factoryName() public view returns (string) {
    return "DoubleTapVote";
  }
  
  function factoryAmount() public view returns (uint) {
    return 10;
  }
  
}