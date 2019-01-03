pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract SimpleList is Ownable {

  mapping (address => uint) public admins;

  constructor() Ownable() public {
    admins[msg.sender] = 1;
  }

  mapping(string => uint) private _entityMap;
  string[] private _entityList;

  event EntityAdded(string hash);
  event EntityDeleted(string hash);
  event AdminAdded(address _address);
  event AdminRemoved(address _address);


  modifier onlyAdmin() {
    require (admins[msg.sender] == 1);
    _;
  }

  function count() public constant returns(uint) {
    return _entityList.length;
  }

  function addEntity(string hash) public onlyAdmin returns(bool) {
    _entityMap[hash] = _entityList.push(hash) - 1;
    emit EntityAdded(hash);
    return true;
  }

  function getEntity(uint index) public view returns(string) {
    return _entityList[index];
  }

  function deleteEntity(string hash) public onlyOwner returns(bool) {
    uint rowToDelete = _entityMap[hash];
    string storage keyToMove = _entityList[_entityList.length-1];
    _entityList[rowToDelete] = keyToMove;
    _entityMap[keyToMove] = rowToDelete;
    _entityList.length--;
    emit EntityDeleted(hash);
    return true;
  }

  function addAdmin(address _address) public onlyOwner returns(bool) {
    require(_address != address(0));
    admins[_address] = 1;
    emit AdminAdded(_address);
    return true;
  }

  function removeAdmin(address _address) public onlyOwner returns(bool) {
    require(_address != address(0));
    delete admins[_address];
    emit AdminRemoved(_address);
    return true;
  }

  function isAdmin(address _address) public view returns(bool) {
    return admins[_address] == 1;
  }
}
