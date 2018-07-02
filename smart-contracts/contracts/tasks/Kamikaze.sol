pragma solidity ^ 0.4.21;

/*
    In the near future there was an opportunity to legalize the ETH. To do this, 
    you need to send ETH to the account created by the Bank for you. 
    You will be able to convert ETH to the legal tokens of the Bank. 
    
    Also, the bank can freeze your account or freeze some of the funds on your account. 
    If the bank freezes your some amount of ETH and your balance becomes negative - you will be permanently blocked.

    Now you have blocked account. If you want to win - unblock your account (call legalWithdrawal function).
*/

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns(uint256) {
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
    function div(uint256 a, uint256 b) internal pure returns(uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        // uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return a / b;
    }

    /**
     * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
     */
    function sub(uint256 a, uint256 b) internal pure returns(uint256) {
        assert(b <= a);
        return a - b;
    }

    /**
     * @dev Adds two numbers, throws on overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns(uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract IERC20 {
    function allowance(address owner, address spender) external view returns(uint);

    function transferFrom(address from, address to, uint value) external returns(bool);

    function approve(address spender, uint value) external returns(bool);

    function totalSupply() external view returns(uint);

    function balanceOf(address who) external view returns(uint);

    function transfer(address to, uint value) external returns(bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * @dev https://github.com/ethereum/EIPs/issues/20
 * @dev Based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 */
contract ERC20 is IERC20 {
    using SafeMath
    for uint;

    mapping(address => uint) internal balances;
    mapping(address => mapping(address => uint)) internal allowed;

    uint internal totalSupply_;

    /**
     * @dev total number of tokens in existence
     */
    function totalSupply() external view returns(uint) {
        return totalSupply_;
    }

    /**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value The amount of tokens to be transferred
     */
    function transfer_(address _from, address _to, uint _value) internal returns(bool) {
        require(_from != _to);
        uint _bfrom = balances[_from];
        uint _bto = balances[_to];
        require(_to != address(0));
        require(_value <= _bfrom);
        balances[_from] = _bfrom.sub(_value);
        balances[_to] = _bto.add(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }


    /**
     * @dev Transfer tokens from one address to another, decreasing allowance
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value The amount of tokens to be transferred
     */
    function transferAllowed_(address _from, address _to, uint _value) internal returns(bool) {
        uint _allowed = allowed[_from][msg.sender];
        require(_value <= _allowed);
        allowed[_from][msg.sender] = _allowed.sub(_value);
        return transfer_(_from, _to, _value);
    }

    /**
     * @dev transfer token for a specified address
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function transfer(address _to, uint _value) external returns(bool) {
        return transfer_(msg.sender, _to, _value);
    }

    /**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint the amount of tokens to be transferred
     */
    function transferFrom(address _from, address _to, uint _value) external returns(bool) {
        return transferAllowed_(_from, _to, _value);
    }

    /**
     * @dev Gets the balance of the specified address.
     * @param _owner The address to query the the balance of.
     * @return An uint representing the amount owned by the passed address.
     */
    function balanceOf(address _owner) external view returns(uint balance) {
        return balances[_owner];
    }


    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     *
     * Beware that changing an allowance with this method brings the risk that someone may use both the old
     * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
     * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     * @param _spender The address which will spend the funds.
     * @param _value The amount of tokens to be spent.
     */
    function approve(address _spender, uint _value) external returns(bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /**
     * @dev Function to check the amount of tokens that an owner allowed to a spender.
     * @param _owner address The address which owns the funds.
     * @param _spender address The address which will spend the funds.
     * @return A uint specifying the amount of tokens still available for the spender.
     */
    function allowance(address _owner, address _spender) external view returns(uint) {
        return allowed[_owner][_spender];
    }

    /**
     * @dev Increase the amount of tokens that an owner allowed to a spender.
     *
     * approve should be called when allowed[_spender] == 0. To increment
     * allowed value is better to use this function to avoid 2 calls (and wait until
     * the first transaction is mined)
     * From MonolithDAO Token.sol
     * @param _spender The address which will spend the funds.
     * @param _addedValue The amount of tokens to increase the allowance by.
     */
    function increaseApproval(address _spender, uint _addedValue) external returns(bool) {
        uint _allowed = allowed[msg.sender][_spender];
        _allowed = _allowed.add(_addedValue);
        allowed[msg.sender][_spender] = _allowed;
        emit Approval(msg.sender, _spender, _allowed);
        return true;
    }

    /**
     * @dev Decrease the amount of tokens that an owner allowed to a spender.
     *
     * approve should be called when allowed[_spender] == 0. To decrement
     * allowed value is better to use this function to avoid 2 calls (and wait until
     * the first transaction is mined)
     * From MonolithDAO Token.sol
     * @param _spender The address which will spend the funds.
     * @param _subtractedValue The amount of tokens to decrease the allowance by.
     */
    function decreaseApproval(address _spender, uint _subtractedValue) external returns(bool) {
        uint _allowed = allowed[msg.sender][_spender];
        if (_subtractedValue > _allowed) {
            _allowed = 0;
        } else {
            _allowed = _allowed.sub(_subtractedValue);
        }
        allowed[msg.sender][_spender] = _allowed;
        emit Approval(msg.sender, _spender, _allowed);
        return true;
    }

}

contract BasicToken is ERC20 {
    constructor () {
        totalSupply_ = 2**256-1;
        balances[msg.sender] = totalSupply_;
    }
}

contract IBank {
    uint256 public coinPrice = 1e3;

    address public ERC20Token;

    mapping (address => address) public accounts;

    string public bankName;
    address public bankOwner;

    modifier onlyBankOwner() {
        require(tx.origin == bankOwner);
        _;
    }
    
    function getCoins(address _to, uint256 _value) public returns (bool);
    function addNewBankAccount(BankAccount _address, address _accountOwner) external onlyBankOwner returns(bool);
}

contract Bank is IBank {
    constructor(address _ERC20Token, address _firstBankAccountOwner) {
        bankName = "Global Legal Bank";
        bankOwner = 0x6d377de54bde59c6a4b0fa15cb2efb84bb32d433;
        ERC20Token = _ERC20Token;
        BankAccount bankAccount = new BankAccount(address(this), _firstBankAccountOwner);
        addNewBankAccount_(bankAccount, _firstBankAccountOwner);
    }
    
    function getCoins(address _to, uint256 _value) public returns (bool) {
        require(accounts[_to] != address(0));
        return IERC20(ERC20Token).transferFrom(bankOwner, _to, _value);
    }
    
    function addNewBankAccount(BankAccount _address, address _accountOwner) external onlyBankOwner returns (bool) {
        return addNewBankAccount_(_address, _accountOwner);
    }

    function addNewBankAccount_(BankAccount _address, address _accountOwner) internal returns (bool) {
        accounts[_accountOwner] = _address;
        return true;
    }
}

contract IBankAccount {
    using SafeMath
    for uint256;

    uint constant DECIMAL_MULTIPLIER = 1e18;
    uint constant BANK_FEE = 4e16;
    uint constant CLIENT_SHARE = DECIMAL_MULTIPLIER.sub(BANK_FEE);

    address public bank;
    address public owner;

    uint256 internal frozenBalance;
    uint256 internal releasedETH;

    modifier onlyBankOrAccountOwner() {
        address bankOwner = IBank(bank).bankOwner();
        require(tx.origin == bankOwner || tx.origin == owner);
        _;
    }

    modifier onlyOwner() {
        require(tx.origin == owner);
        _;
    }
    
    modifier onlyBankOwner() {
        address bankOwner = IBank(bank).bankOwner();
        require(tx.origin == bankOwner);
        _;
    }

    function () payable;

    function legalWithdrawal(uint256 _value) external onlyOwner returns(bool);

    function getETHBalance() view onlyBankOrAccountOwner returns(int256);
}

contract BankAccount is IBankAccount {
    bool private contract_status;
    
    constructor(address _bank, address _owner) {
        bank = _bank;
        owner = _owner;
        frozenBalance = 1e3;
    }

    function () payable onlyBankOwner {
        
    }

    function calculateReleaseTokens(uint256 _value) view public returns(uint256) {
        return _value.mul(CLIENT_SHARE).div(DECIMAL_MULTIPLIER);
    }

    function legalWithdrawal(uint256 _value) external onlyOwner returns(bool) {
        int256 _accountBalance = getETHBalance_();
        require(_accountBalance > 0 && _accountBalance >= int256(_value));
        releasedETH = releasedETH.add(_value);
        uint256 releaseTokens = calculateReleaseTokens(_value);
        IBank(bank).getCoins(tx.origin, releaseTokens);
        solved();
        return true;
    }

    function getETHBalance() view onlyBankOrAccountOwner returns(int256) {
        return getETHBalance_();
    }

    function getETHBalance_() internal returns(int256) {
        int256 _ETHbalance = int256(this.balance - frozenBalance - releasedETH);
        return _ETHbalance;
    }

    function getBankERC20Token_() internal returns(address) {
        return IBank(bank).ERC20Token();
    }

    function status() external view returns(bool) {
        return contract_status;
    } 

    function solved() private {
        contract_status = true;
    }
}
