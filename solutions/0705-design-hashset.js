/**
 * Design Hashset
 * Time Complexity: O(1)
 * Space Complexity: O(M)
 */
var MyHashSet = function () {
  this.internalStorage = [];
};

MyHashSet.prototype.add = function (inputElement) {
  this.internalStorage[inputElement] = true;
};

MyHashSet.prototype.remove = function (elementToRemove) {
  this.internalStorage[elementToRemove] = false;
};

MyHashSet.prototype.contains = function (queryElement) {
  return this.internalStorage[queryElement] === true;
};
