pragma solidity ^0.4.24;

contract LibraryControllerInterface {
  function getVer() external view returns (address);
}

contract DoubleTapVote {
  
  address[4] voters;
  
  mapping(address => bool) resOfVoter;
  
  bool public finalResult;
  
  int public checker;
  
  uint public counter;
  
  address mainCenter;
  
  address currentVer;
  
  bytes4 constant sig = bytes4(sha3("calc()"));
  
  bool private contract_status;
  
  function status() external view returns (bool) {
    return contract_status;
  }
  
  function solved() private {
    contract_status = true;
  }
  
  constructor (address _center) {
    mainCenter = _center;
    initVotes();
    counter = 4;
    checker = - 4;
  }
  
  function getControllerAddr() view returns(address) {
    return mainCenter;
  }
  
  function getLibAddr() view returns(address) {
    return currentVer;
  }
  
  function getAddressOfLib() private {
    LibraryControllerInterface instance = LibraryControllerInterface(mainCenter);
    currentVer = instance.getVer();
  }
  
  function getFinalRes() {
    getAddressOfLib();
    address callee = currentVer;
    bytes4 funcSignature = sig;
    assembly {
      let memoryPointer := mload(0x40)
      mstore(memoryPointer, funcSignature)
      let newFreeMemoryPointer := add(memoryPointer, 0x20)
      mstore(0x40, newFreeMemoryPointer)
      let retVal := delegatecall(sub(gas, 700), callee, memoryPointer, 0x04, newFreeMemoryPointer, 0x20)
      let retDataSize := returndatasize
      returndatacopy(newFreeMemoryPointer, 0, retDataSize)
      switch retVal case 0 {revert(0, 0)} default {}
    }
    // currentVer.delegatecall(sig);
    if (checker == 0 && finalResult == true) {
      solved();
    }
  }
  
  function initVotes() private {
    voters[0] = 0x19c3ee4435342b8e6fe3e18d6d1d0ec762baffaa;
    voters[1] = 0x19c3ee4435342b8e6fe3e18d6d1d0ec762bafdaa;
    voters[2] = 0x594fea497b8adbfebfa2352cb12c6fee0de12329;
    voters[3] = 0x594fea497b8adbfebfa2352cb12c6fee0de12929;
    
    resOfVoter[voters[0]] = false;
    resOfVoter[voters[1]] = false;
    resOfVoter[voters[2]] = false;
    resOfVoter[voters[3]] = false;
  }
  
  function vote(bool _res) external {
    uint limit = 4;
    require(counter < limit);
    voters[counter] = msg.sender;
    resOfVoter[msg.sender] = _res;
    counter ++;
    
    if (_res) {
      checker += 1;
    }
    else {
      checker -= 1;
    }
  }
}

contract LibraryController {
  
  address public owner;
  
  mapping(uint => address) curVer;
  
  uint256 ver;
  
  constructor (address _ver) {
    ver = 0;
    curVer[ver] = _ver;
  }
  
  function Center() payable {
    owner = msg.sender;
  }
  
  function changeOwner(string pincode, address _newOwner) {
    bytes32 solution = 0xd677db56750b9e5fdf025f148fd0b2a662d7637766ec92f9fcb25f92e5f64889;
    bytes32 compute = sha3(pincode);
    require(compute == solution);
    owner = _newOwner;
  }
  
  function setVer(uint256 _ver, address _veraddr) {
    require(owner == msg.sender);
    ver = _ver;
    curVer[ver] = _veraddr;
  }
  
  function getVer() external view returns (address) {
    return curVer[ver];
  }
  
}

contract LibraryVersionOne {
  
  address[4] voters;
  
  mapping(address => bool) resOfVoter;
  
  bool public finalResult;
  
  int public checker;
  
  uint public counter;
  
  function calc() returns (bool) {
    if (checker > 0) {
      finalResult = true;
    }
  }
  
  function() payable {}
  
}

