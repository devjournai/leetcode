/**
 * Map Sum Pairs
 * Time Complexity: O(L)
 * Space Complexity: O(N*L)
 */

var TrieNode = function () {
  this.children = new Map();
  this.pathSum = 0;
};

var MapSum = function () {
  this.trieRoot = new TrieNode();
  this.keyToValueMap = new Map();
};

MapSum.prototype.insert = function (key, val) {
  let previousValue = this.keyToValueMap.get(key) || 0;
  let valueDifference = val - previousValue;

  this.keyToValueMap.set(key, val);

  let currentNode = this.trieRoot;
  let keyLength = key.length;

  for (
    let currentPosition = 0;
    currentPosition < keyLength;
    currentPosition++
  ) {
    let charCurrent = key[currentPosition];
    if (!currentNode.children.has(charCurrent)) {
      currentNode.children.set(charCurrent, new TrieNode());
    }
    currentNode = currentNode.children.get(charCurrent);
    currentNode.pathSum += valueDifference;
  }
};

MapSum.prototype.sum = function (prefix) {
  let seekNode = this.trieRoot;
  let prefixLength = prefix.length;

  for (let charIndex = 0; charIndex < prefixLength; charIndex++) {
    let currentCharacter = prefix[charIndex];
    if (!seekNode.children.has(currentCharacter)) {
      return 0;
    }
    seekNode = seekNode.children.get(currentCharacter);
  }

  return seekNode.pathSum;
};
