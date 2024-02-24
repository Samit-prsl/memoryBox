// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract memoryNFT is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable {
    uint256 private _nextTokenId;
    uint256 private MAX_MINT = 1000; 


    constructor(string memory _Name,string memory _Symbol)
        ERC721(_Name, _Symbol)
    {}

    struct User {
        uint256 _Count;
    }

    mapping (address => User[]) public user;

    modifier RestrictionForMaxMinting()  {
        require(MAX_MINT >= 1000,"You cannot mint more NFTs!");
        _;
    }

    function DynamicNftPricing(uint supply) internal view  returns (uint _cost) {
        if(supply <50)
            return 0.04 ether;
        if(supply < 100)
            return 0.08 ether;
        if (supply <= MAX_MINT) 
            return 0.1 ether;
        if (supply > MAX_MINT)
            return 100 ether;
    }

    function safeMint(address to, string memory uri) public payable RestrictionForMaxMinting {
        uint256 tokenId = _nextTokenId++;
        //uint256 supply = totalSupply();
       // require(msg.value >= DynamicNftPricing(supply),"Not enough funds!");
        User memory _user = User({
            _Count : tokenId
        });
        user[to].push(_user);
        require(user[to][user[to].length-1]._Count <=5,"Max Minting limit exceeded from this address!");
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}