pragma solidity ^0.4.21;

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
  
  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }
  
  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }
  
  /**
  * @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }
  
  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}


contract ERC223Interface {
  uint public totalSupply;
  function balanceOf(address who) constant returns (uint);
  function transfer(address to, uint value);
  function transfer(address to, uint value, bytes data);
  event Transfer(address indexed from, address indexed to, uint value, bytes data);
}

contract ERC223Token is ERC223Interface {
  using SafeMath for uint;
  
  mapping(address => uint) balances; // List of user balances.
  
  /**
   * @dev Transfer the specified amount of tokens to the specified address.
   *      Invokes the `tokenFallback` function if the recipient is a contract.
   *      The token transfer fails if the recipient is a contract
   *      but does not implement the `tokenFallback` function
   *      or the fallback function to receive funds.
   *
   * @param _to    Receiver address.
   * @param _value Amount of tokens that will be transferred.
   * @param _data  Transaction metadata.
   */
  function transfer(address _to, uint _value, bytes _data) {
    // Standard function transfer similar to ERC20 transfer with no _data .
    // Added due to backwards compatibility reasons .
    uint codeLength;
    
    assembly {
    // Retrieve the size of the code on target address, this needs assembly .
      codeLength := extcodesize(_to)
    }
    
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    if(codeLength>0) {
      ERC223ReceivingContract receiver = ERC223ReceivingContract(_to);
      receiver.tokenFallback(msg.sender, _value, _data);
    }
    emit Transfer(msg.sender, _to, _value, _data);
  }
  
  /**
   * @dev Transfer the specified amount of tokens to the specified address.
   *      This function works the same with the previous one
   *      but doesn't contain `_data` param.
   *      Added due to backwards compatibility reasons.
   *
   * @param _to    Receiver address.
   * @param _value Amount of tokens that will be transferred.
   */
  function transfer(address _to, uint _value) {
    uint codeLength;
    bytes memory empty;
    
    assembly {
    // Retrieve the size of the code on target address, this needs assembly .
      codeLength := extcodesize(_to)
    }
    
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    if(codeLength>0) {
      ERC223ReceivingContract receiver = ERC223ReceivingContract(_to);
      receiver.tokenFallback(msg.sender, _value, empty);
    }
    emit Transfer(msg.sender, _to, _value, empty);
  }
  
  
  /**
   * @dev Returns balance of the `_owner`.
   *
   * @param _owner   The address whose balance will be returned.
   * @return balance Balance of the `_owner`.
   */
  function balanceOf(address _owner) constant returns (uint balance) {
    return balances[_owner];
  }
}


/**
* @title Contract that will work with ERC223 tokens.
*/

contract ERC223ReceivingContract {
  /**
   * @dev Standard ERC223 function that will handle incoming token transfers.
   *
   * @param _from  Token sender address.
   * @param _value Amount of tokens.
   * @param _data  Transaction metadata.
   */
  function tokenFallback(address _from, uint _value, bytes _data);
}

contract Vault is ERC223ReceivingContract, ERC223Token {
  
  bool private contract_status;
  
  mapping(address=>uint) sentSum;
  
  constructor () {
    totalSupply = 10000;
    balances[this] = totalSupply;
    giftController = true;
  }
  
  bool private giftController;
  
  function gift() {
    require(giftController);
    giftController = false;
    balances[msg.sender] = 1000;
  }
  
  function put(uint sum) {
    transfer(this, sum);
    sentSum[msg.sender] = sum;
  }
  
  function transferFrom(address _from, address _to,uint256 _value) public returns(bool) {
    uint codeLength;
    bytes memory empty;
    
    assembly {
    // Retrieve the size of the code on target address, this needs assembly .
      codeLength := extcodesize(_to)
    }
    
    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
    if(codeLength>0) {
      ERC223ReceivingContract receiver = ERC223ReceivingContract(_to);
      receiver.tokenFallback(_from, _value, empty);
    }
    emit Transfer(_from, _to, _value, empty);
    return true;
  }
  
  function get() {
    
    transferFrom(this, msg.sender, sentSum[msg.sender]);
    
    sentSum[msg.sender] = 0;
    
    if (balances[this] == 0) {
      solved();
    }
  }
  
  function tokenFallback(address _from, uint _value, bytes _data) {}
  
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
