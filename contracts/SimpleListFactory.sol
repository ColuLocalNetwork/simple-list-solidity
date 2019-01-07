pragma solidity ^0.4.24;

import './SimpleList.sol';

contract SimpleListFactory {
  mapping (address => address) public tokenToListMap;

  event SimpleListCreated(address list, address admin);

  function createSimpleList(address token) public returns (address) {
    require(token != address(0));
    require(tokenToListMap[token] == address(0));
    SimpleList simpleList = new SimpleList(msg.sender);
    tokenToListMap[token] = simpleList;
    emit SimpleListCreated(simpleList, msg.sender);
    return simpleList;
  }

}
