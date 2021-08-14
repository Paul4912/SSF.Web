//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;
    address constant ssfAddress = 0x0B151Aa48399e0B38aF83686F1b094605f8ed2a5;
    uint256 mintingPrice = 1000000000 ether;
    address payable owner;

    constructor(address marketplaceAddress) ERC721("SSF Meme", "SSF") {
        contractAddress = marketplaceAddress;
        owner = payable(msg.sender);
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function createToken(string memory tokenUri) public returns (uint) {
        uint256 allowance = IERC20(ssfAddress).allowance(msg.sender, address(this));
        require(allowance >= mintingPrice, "Check the token allowance");
        IERC20(ssfAddress).transferFrom(msg.sender, contractAddress, mintingPrice);

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenUri);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function fetchMyNFTs() public view returns (uint[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint currentIndex = 0;

        uint balance = balanceOf(msg.sender);
        uint[] memory items = new uint[](balance);
        for (uint i = 0; i < totalItemCount; i++) {
            if (ownerOf(i + 1) == msg.sender) {
                items[currentIndex] = i + 1;
                currentIndex += 1;
            }
        }
        return items;
    }

    function withdraw() public onlyOwner {
        uint balance = IERC20(ssfAddress).balanceOf(address(this));
        IERC20(ssfAddress).transferFrom(address(this), owner, balance);
    }
}