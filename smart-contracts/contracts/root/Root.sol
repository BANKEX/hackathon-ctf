pragma solidity ^0.4.23;

import "../ownership/Ownable.sol";
import "../factory/IFactory.sol";
import "../factory/IInstance.sol";


contract Root is Ownable {

  mapping (address=>address) public teamHash;
  mapping (address=>string) public participantName;
  mapping (address=>bool) public signed;
  mapping (address=>bool) public signedTeam;
  mapping (address=>mapping(address=>bool)) invitation;

  mapping (bytes32 => address) public factoryAddress;
  mapping (bytes32 => uint) public factoryAmount;

  mapping (bytes32 => mapping (address => address)) public instance;
  mapping (bytes32 => mapping (address => bool)) public solved;
  mapping (bytes32 => mapping (address => uint)) public solvedTimestamp;
  mapping (bytes32 => address) internal libs_;

  uint timeout;


  event Solved(uint indexed timestamp, address participantAddress, address participantTeamAddress,string factoryName, uint amount);
  event Invite(address indexed participantAddress, address participantTeamAddress);

  constructor(uint _timeout) public{
    timeout = _timeout;
  }


  function signUpTeam(string _teamName) public returns(bool){
    uint _teamNameLength = bytes(_teamName).length;
    address _teamHash = address(keccak256(_teamName));
    require(!signed[msg.sender]);
    require(!signedTeam[_teamHash]);
    require(_teamNameLength < 64 && _teamNameLength > 5);
    teamHash[msg.sender] = _teamHash;
    participantName[_teamHash] = _teamName;
    signed[msg.sender] = true;
    signedTeam[_teamHash] = true;
    emit Invite(msg.sender, _teamHash);
    return true;
  }

  function inviteMember(address _member) public returns(bool){
    address _teamHash = teamHash[msg.sender];
    require (_teamHash!=address(0));
    invitation[_member][_teamHash] = true;
    emit Invite(_member, _teamHash);
    return true;
  }

  function acceptInvitation(address _teamHash) public returns(bool) {
    require(!signed[msg.sender]);
    require(invitation[msg.sender][_teamHash]);
    signed[msg.sender] = true;
    teamHash[msg.sender] = _teamHash;
    return true;
  }

  function getSignedUp() view public returns(bool) {
    return signed[msg.sender];
  }

  function getTeamName() view public returns(string) {
    return participantName[teamHash[msg.sender]];
  }

  function fixName(address _teamHash, string _name) public onlyOwner returns(bool){
    require(signedTeam[_teamHash]);
    participantName[_teamHash] = _name;
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
    address _teamHash = teamHash[msg.sender];
    require(!solved[keccak256(_factoryName)][_teamHash]);
    require(signed[msg.sender]);
    IFactory _factory = IFactory(factoryAddress[keccak256(_factoryName)]);
    address _instance = _factory.deploy();
    instance[keccak256(_factoryName)][_teamHash] = _instance;
    return true;
  }

  function getInstance(string _factoryName) public view returns(address){
    address _teamHash = teamHash[msg.sender];
    return instance[keccak256(_factoryName)][_teamHash];

  }

  function getSolved(string _factoryName) public view returns(bool){
    address _teamHash = teamHash[msg.sender];
    return solved[keccak256(_factoryName)][_teamHash];

  }

  function checkSolved(string _factoryName) public returns(bool){
    require(block.timestamp< timeout);
    address _teamHash = teamHash[msg.sender];
    require(!solved[keccak256(_factoryName)][_teamHash]);
    require(signed[msg.sender]);
    bool _status = IInstance(instance[keccak256(_factoryName)][_teamHash]).status();
    if(_status) {
      solved[keccak256(_factoryName)][_teamHash] = true;
      solvedTimestamp[keccak256(_factoryName)][_teamHash] = block.timestamp;
      emit Solved(block.timestamp, msg.sender, _teamHash, _factoryName, factoryAmount[keccak256(_factoryName)]);
    }
    return true;
  }
  

}