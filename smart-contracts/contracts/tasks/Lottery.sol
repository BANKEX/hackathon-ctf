contract Lottery {
  
  address owner;
  
  address[1001] public participators;
  
  address public winner;
  
  uint256 sum;
  
  address public winContract;
  
  constructor () {
    
    owner = msg.sender;
    participators[1] = 0xca35b7d915458ef540ade6068dfe2f44e8fa723c;
    participators[2] = 0xca35b7d915458ef540ade6068dfe2f44e8fa743c;
    //
    // ...
    participators[1000] = 0xca35b7d915458ef540ade6068dfe2f44e8fa343c;
    
  }
  
  modifier onlyOwner() {
    require(owner == msg.sender);
    _;
  }
  
  
  function participate() payable {
    require(msg.value >= 0.1 ether);
    participators[0] = msg.sender;
  }
  
  uint256 private pi = 31415926535897932384626433832795;
  
  function initLottery(uint256 _lot)  {
    require(_lot < pi - 1000);
    uint256 _winner = uint256((uint256(uint256(block.blockhash(block.number - 10)))
    / pi % 1000) + _lot) % 1000;
    setWinnerAddress(participators[_winner]);
  }
  
  function setWinnerAddress(address _target) {
    winner = _target;
  }
  
  function sendToWinner() {
    SuperContract s = SuperContract(winContract);
    s.setOwner(winner);
  }
  
  function setSuperContract(address _c) onlyOwner {
    winContract = _c;
  }
}

contract SuperContract {
  
  address owner;
  
  bool private contract_status;
  
  constructor () {
    owner = msg.sender;
  }
  
  function status() external view returns (bool) {
    return contract_status;
  }
  
  function solved() private {
    contract_status = true;
  }
  
  modifier onlyOwner() {
    require(owner == msg.sender);
    _;
  }
  
  function setOwner(address _owner) onlyOwner {
    owner = _owner;
  }
  
  
  function withdraw() onlyOwner {}
  
  function win() onlyOwner {
    solved();
  }
  
}
