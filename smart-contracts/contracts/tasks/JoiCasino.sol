pragma solidity ^0.4.21;


// You need to win by putting correct bet
// Here you a have original code of contract 


contract Vulkan {
    
  bool private contract_status;

  modifier onlyBet() {
      require(msg.value >= 0.1 ether && msg.value <= 5 ether);
      _;
  }
  
  function status() external view returns(bool) {
    return contract_status;
  }

  function setBet(uint256 _userBet) external payable onlyBet {
    if(_userBet == rand()) {
        msg.sender.transfer(address(this).balance);
        solved();
    }
  } 
  uint256 constant private curve_dot_one = ~uint256(12);
  uint256 constant private curve_dot_two = ~uint256(100);
  uint256 constant private curve_dot_three = ~uint256(curve_dot_two);

  function rand() private view returns (uint256 result) {
    uint256 solc_one = curve_dot_one / curve_dot_two;
    uint256 sum_solc = uint256(block.blockhash(block.number - 1));
    return uint256((uint256(sum_solc) / solc_one)) % curve_dot_three;
  }
  
  function solved() private {
    contract_status = true;
  }
  
  function() public payable {}

}
