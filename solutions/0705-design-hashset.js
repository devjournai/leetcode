/**
 * Design Hashset
 * Intuition: Keys are non-negative ints in a bounded range, so a sparse array of booleans is enough: index equals the key.
 * Approach: 1. `add` sets `internalStorage[inputElement]=true`. 2. `remove` sets that slot false. 3. `contains` is true only if the slot is strictly `=== true`.
 * Dry Run: add(1), add(2), contains(1) true, contains(3) false, add(2), contains(2) true, remove(2), contains(2) false.
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
