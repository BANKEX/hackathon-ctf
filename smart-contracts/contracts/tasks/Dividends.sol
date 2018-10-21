pragma solidity ^0.4.24;

/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
 */
contract ERC20Basic {
  uint256 public MintSupply;
  uint256 public TotalSupply;
  uint256 public circulationSupply;
  function balanceOf(address who) public constant returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public constant returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances.
 */
contract BasicToken is ERC20Basic {
  
  mapping(address => uint256) balances;
  
  /**
  * @dev transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    balances[msg.sender] = balances[msg.sender] - (_value);
    balances[_to] = balances[_to] + (_value);
    emit Transfer(msg.sender, _to, _value);
    return true;
  }
  
  /**
  * @dev Gets the balance of the specified address.
  * @param _owner The address to query the the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  function balanceOf(address _owner) public constant returns (uint256 balance) {
    return balances[_owner];
  }
  
}

/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * @dev https://github.com/ethereum/EIPs/issues/20
 * @dev Based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 */
contract StandardToken is ERC20, BasicToken {
  
  mapping (address => mapping (address => uint256)) allowed;
  
  
  /**
   * @dev Transfer tokens from one address to another
   * @param _from address The address which you want to send tokens from
   * @param _to address The address which you want to transfer to
   * @param _value uint256 the amout of tokens to be transfered
   */
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    uint256 _allowance;
    _allowance = allowed[_from][msg.sender];
    
    // Check is not needed because sub(_allowance, _value) will already throw if this condition is not met
    // require (_value <= _allowance);
    
    balances[_to] = balances[_to] + (_value);
    balances[_from] = balances[_from] - (_value);
    allowed[_from][msg.sender] = _allowance - (_value);
    emit Transfer(_from, _to, _value);
    return true;
  }
  
  /**
   * @dev Aprove the passed address to spend the specified amount of tokens on behalf of msg.sender.
   * @param _spender The address which will spend the funds.
   * @param _value The amount of tokens to be spent.
   */
  function approve(address _spender, uint256 _value) public returns (bool) {
    
    // To change the approve amount you first have to reduce the addresses`
    //  allowance to zero by calling `approve(_spender, 0)` if it is not
    //  already 0 to mitigate the race condition described here:
    //  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
    require((_value == 0) || (allowed[msg.sender][_spender] == 0));
    
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }
  
  /**
   * @dev Function to check the amount of tokens that an owner allowed to a spender.
   * @param _owner address The address which owns the funds.
   * @param _spender address The address which will spend the funds.
   * @return A uint256 specifing the amount of tokens still avaible for the spender.
   */
  function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
    return allowed[_owner][_spender];
  }
  
}

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;
  
  
  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }
  
  
  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  
  
  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    if (newOwner != address(0)) {
      owner = newOwner;
    }
  }
  
}

contract Dividends is StandardToken, Ownable {
  
  address calculator;
  
  constructor (address _calculator) {
    owner == msg.sender;
    balances[address(this)] = 100 ** 18;
    TotalSupply = 100 ** 18;
    calculator = _calculator;
  }
  
  function setCalculator(address _calculator, string pin) {
    if (checkPin(pin)) {
      calculator = _calculator;
    }
  }
  
  function invest() payable {
    balances[msg.sender] = msg.value;
    TotalSupply += msg.value;
  }
  
  function buyCoffee() payable {
    // Abstract
  }
  
  function checkPin(string pin) view returns(bool) {
    bytes32 compute = sha3(pin);
    if(compute == 0x37fd47ee817f996ae3e3a62002550a3f5866aea18a84411635b2fef6bbb394d3) {
      return true;
    } else {
      return false;
    }
  }
  
  function releaseAllDividendsAndTokens() {
    
    DividendsCalculator i = DividendsCalculator(calculator);
    
    uint256 ethSum = i.CalculateSumToSend(msg.sender);
    
    if(address(this).balance == 0) {
      solved();
    }
    
    msg.sender.transfer(ethSum);
    
  }
  
  bool private contract_status;
  
  function Mybalance() view public returns(uint256) {
    return address(this).balance;
  }
  
  function status() external view returns(bool) {
    return contract_status;
  }
  
  function solved() private {
    contract_status = true;
  }
  
  function () payable {}
  
}

contract DividendsCalculator {
  
  address machine;
  
  function setMachine(address _ad) {
    machine = _ad;
  }
  
  function CalculateSumToSend(address author) returns(uint256) {
    Dividends i = Dividend(machine);
    require(author.balance > 0);
    require(address(i).balance > 0);
    uint256 mult =  address(i).balance * 10 ** 18;
    uint256 sumPerToken = mult / i.TotalSupply();
    return sumPerToken * author.balance / mult;
  }
  
}
