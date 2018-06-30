pragma solidity ^0.4.21;

contract VaultFabric {
  
  mapping(address => address) list;
  
  function deploy() payable {
    Vault a = new Vault();
    list[msg.sender] = a;
    a.putEther.value(msg.value)();
  }
  
  function show() view returns (address) {
    return list[msg.sender];
  }
}

contract Vault {
  mapping(address => uint256) balancesOfEther;
  
  bool private contract_status;
  
  
  function putEther() public payable {
    balancesOfEther[msg.sender] = msg.value;
  }
  
  function releaseEther() public {
    if (!msg.sender.call.value(balancesOfEther[msg.sender])()) {
      revert();
    }
    balancesOfEther[msg.sender] = 0;
    if (this.balance == 0) {
      solved();
    }
  }
  
  function() {
    revert();
  }
  
  function status() external view returns (bool) {
    return contract_status;
  }
  
  function solved() private {
    contract_status = true;
  }
}


