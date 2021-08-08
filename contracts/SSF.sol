//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StupidSexyFlanders is ERC20 {
    constructor(uint256 initialSupply) public ERC20("StupidSexyFlanders", "SSF") {
        _mint(msg.sender, initialSupply);
    }
}