contract ProxyLibraryInterface {
  function getVer() external view returns (address);
}

contract CALLapse {
  bytes4 constant sig = bytes4(sha3("test()"));

  bool public finalResult;
  address private proxy;
  address public currentVer;
  bool private contract_status;
  uint private deployement;

  constructor (address _ver) {
    currentVer = _ver;
    init("getVer()", address(this));
    deployement++;
  }

  function status() external view returns (bool) {
    return contract_status;
  }

  function releaseFee() {
    ProxyLibraryInterface instance = ProxyLibraryInterface(proxy);
    currentVer = instance.getVer();

    address _currentVer = currentVer;
    bytes4 _sig = sig;

    assembly {
      let mp := mload(0x40)
      mstore(mp, _sig)

      let nmp := add(mp, 0x20)
      mstore(0x40, nmp)

      let a := delegatecall(sub(gas, 700), _currentVer, mp, 0x04, nmp, 0x20)
    }
  }

  function init(string _s, address _i) {
    if (deployement == 0) {
      ProxyLibrary pxl = new ProxyLibrary(currentVer);
      proxy = address(pxl);
    }

    address _proxy = proxy;

    proxy.call(bytes4(sha3(_s)), _i);
  }

  function getProxyAddress() public view returns (address) {
    return proxy;
  }


  function solved() private {
    contract_status = true;
  }
}

contract ProxyLibrary {
  mapping(uint => address) curVer;
  uint256 ver;
  address public owner;

  event Trigger();

  constructor (address _ver) {
    owner = msg.sender;
    ver = 0;
    curVer[ver] = _ver;
  }

  function transferOwnership(address _newOwner) {
    require(msg.sender == owner);
    owner = _newOwner;
    emit Trigger();
  }

  function setVer(uint256 _ver, address _veraddr) {
    require(msg.sender == owner);
    ver = _ver;
    curVer[ver] = _veraddr;
  }

  function getVer() external view returns (address) {
    return curVer[ver];
  }
}

contract VersionOne {
  bool public finalResult;

  function test() returns (bool) {

  }

  function() payable {}
}