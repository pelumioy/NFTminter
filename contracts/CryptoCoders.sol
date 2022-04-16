pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract CryptoCoders is ERC721, ERC721Enumerable {

    string[] public names;

    mapping(string => bool) _itExists;

    constructor() ERC721("CryptoCoders", "CPC"){

    }

    function mint(string memory coder) public {
        require(!_itExists[coder]);
        names.push(coder);
        uint _id = names.length - 1;
        _mint(msg.sender, _id);
        _itExists[coder] = true;

    }
        function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}