pragma solidity ^0.4.23;

import "../ownership/Ownable.sol";
import "../factory/IFactory.sol";
import "../factory/IInstance.sol";


contract Root is Ownable {

  mapping (address=>string) public participantName;
  mapping (address=>bool) public signed;

  mapping (bytes32 => address) public factoryAddress;
  mapping (bytes32 => uint) public factoryAmount;

  mapping (bytes32 => mapping (address => address)) public instance;
  mapping (bytes32 => mapping (address => bool)) public solved;

  mapping (bytes32 => address) internal libs_;


  event Solved(uint indexed timestamp, address participantAddress, string factoryName, uint amount);


  function signUp(string _name) public returns(bool){
    require(!signed[msg.sender]);
    participantName[msg.sender] = _name;
    signed[msg.sender] = true;
    return true;
  }

  function fixName(address _participant, string _name) public onlyOwner returns(bool){
    require(signed[_participant]);
    participantName[_participant] = _name;
    return true;
  }

  function setLib(string _libName, address _libAddress) public onlyOwner returns(bool){
    libs_[keccak256(_libName)] = _libAddress;
    return true;
  }

  function getLib(string _libName) public view returns(address){
    return libs_[keccak256(_libName)];
  }


  function addFactory(address _factoryAddress) onlyOwner public returns(bool){
    IFactory _factory = IFactory(_factoryAddress);
    bytes32 _bname = keccak256(_factory.factoryName());
    factoryAddress[_bname] = _factoryAddress;
    factoryAmount[_bname] = _factory.factoryAmount();
    return true;
  }

  function createInstance(string _factoryName) public returns(bool){
    require(!solved[keccak256(_factoryName)][msg.sender]);
    require(signed[msg.sender]);
    IFactory _factory = IFactory(factoryAddress[keccak256(_factoryName)]);
    address _instance = _factory.deploy();
    instance[keccak256(_factoryName)][msg.sender] = _instance;
    return true;
  }

  function getInstance(string _factoryName) public view returns(address){
    return instance[keccak256(_factoryName)][msg.sender];
  }

  function getSolved(string _factoryName) public view returns(bool){
    return solved[keccak256(_factoryName)][msg.sender];
  }

  function checkSolved(string _factoryName) public returns(bool){
    require(block.timestamp<1526828400);
    require(!solved[keccak256(_factoryName)][msg.sender]);
    require(signed[msg.sender]);
    bool _status = IInstance(instance[keccak256(_factoryName)][msg.sender]).status();
    if(_status) {
      solved[keccak256(_factoryName)][msg.sender] = true;
      emit Solved(block.timestamp, msg.sender, _factoryName, factoryAmount[keccak256(_factoryName)]);
    }
    return true;
  }
  
}