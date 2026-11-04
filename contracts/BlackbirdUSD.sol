// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BlackbirdUSD (BBUSD) - Real World Asset (RWA) Tokenized Treasury Note
 * @notice Permissioned RWA compliance token representing audited treasury backing.
 * Compliant with institutional reserve minting, burn-on-redemption, and compliance pause controls.
 */

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract BlackbirdUSD is IERC20 {
    string public constant name = "Blackbird USD RWA Note";
    string public constant symbol = "BBUSD";
    uint8 public constant decimals = 6; // Standard 6-decimal precision matching USD/USDC

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    address public regulatoryIssuer;
    address public custodialOracle;
    bool public paused;

    // Compliance verification mappings (KYC/AML Whitelist for Tokenized Securities)
    mapping(address => bool) public isWhitelisted;

    // Proof of Reserve Attestation
    struct Attestation {
        uint256 verifiedReserveUSD;
        string depositoryBank;
        string attestationDocHash;
        uint256 timestamp;
    }
    Attestation public latestAttestation;

    event WhitelistUpdated(address indexed account, bool status);
    event OracleUpdated(address indexed newOracle);
    event AttestationRecorded(uint256 verifiedReserveUSD, string depositoryBank, string attestationDocHash);
    event MintedAgainstReserve(address indexed recipient, uint256 amountUSD, string depositRef);
    event RedeemedForFiat(address indexed burner, uint256 amountUSD, string payoutWireRef);
    event Paused(bool isPaused);

    modifier onlyIssuer() {
        require(msg.sender == regulatoryIssuer, "BBUSD: caller is not issuer");
        _;
    }

    modifier onlyOracleOrIssuer() {
        require(msg.sender == custodialOracle || msg.sender == regulatoryIssuer, "BBUSD: caller unauthorized");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "BBUSD: token transfers paused");
        _;
    }

    constructor(address _custodialOracle) {
        regulatoryIssuer = msg.sender;
        custodialOracle = _custodialOracle;
        isWhitelisted[msg.sender] = true;
    }

    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 value) external override whenNotPaused returns (bool) {
        require(isWhitelisted[msg.sender], "BBUSD: sender not KYC cleared");
        require(isWhitelisted[to], "BBUSD: recipient not KYC cleared");
        _transfer(msg.sender, to, value);
        return true;
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 value) external override returns (bool) {
        _allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external override whenNotPaused returns (bool) {
        require(isWhitelisted[from], "BBUSD: sender not KYC cleared");
        require(isWhitelisted[to], "BBUSD: recipient not KYC cleared");
        uint256 currentAllowance = _allowances[from][msg.sender];
        require(currentAllowance >= value, "BBUSD: insufficient allowance");
        unchecked {
            _allowances[from][msg.sender] = currentAllowance - value;
        }
        _transfer(from, to, value);
        return true;
    }

    function recordAttestation(
        uint256 reserveAmount,
        string calldata depositoryBank,
        string calldata docHash
    ) external onlyOracleOrIssuer {
        latestAttestation = Attestation({
            verifiedReserveUSD: reserveAmount,
            depositoryBank: depositoryBank,
            attestationDocHash: docHash,
            timestamp: block.timestamp
        });
        emit AttestationRecorded(reserveAmount, depositoryBank, docHash);
    }

    /**
     * @notice Mint tokenized USD notes upon verified bank wire receipt
     */
    function mintAgainstReserve(
        address recipient,
        uint256 amount,
        string calldata depositRef
    ) external onlyIssuer {
        require(isWhitelisted[recipient], "BBUSD: recipient not KYC cleared");
        require(_totalSupply + amount <= latestAttestation.verifiedReserveUSD, "BBUSD: mint exceeds audited reserve");
        
        _totalSupply += amount;
        _balances[recipient] += amount;
        emit MintedAgainstReserve(recipient, amount, depositRef);
        emit Transfer(address(0), recipient, amount);
    }

    /**
     * @notice Burn tokenized notes to initiate fiat bank wire payout
     */
    function redeemForFiat(
        uint256 amount,
        string calldata payoutWireRef
    ) external whenNotPaused {
        require(_balances[msg.sender] >= amount, "BBUSD: insufficient token balance");
        
        _balances[msg.sender] -= amount;
        _totalSupply -= amount;
        
        emit RedeemedForFiat(msg.sender, amount, payoutWireRef);
        emit Transfer(msg.sender, address(0), amount);
    }

    function setWhitelisted(address account, bool status) external onlyIssuer {
        isWhitelisted[account] = status;
        emit WhitelistUpdated(account, status);
    }

    function setPaused(bool _paused) external onlyIssuer {
        paused = _paused;
        emit Paused(_paused);
    }

    function setCustodialOracle(address _oracle) external onlyIssuer {
        custodialOracle = _oracle;
        emit OracleUpdated(_oracle);
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(from != address(0), "BBUSD: transfer from zero");
        require(to != address(0), "BBUSD: transfer to zero");
        require(_balances[from] >= value, "BBUSD: balance too low");

        unchecked {
            _balances[from] -= value;
            _balances[to] += value;
        }
        emit Transfer(from, to, value);
    }
}
