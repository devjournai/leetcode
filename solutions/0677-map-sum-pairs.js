/**
 * Map Sum Pairs
 * Intuition: Prefix sums live on a trie: each node’s `pathSum` is the total of values of keys that pass through it. Re-inserting a key adds only the delta so old values are overwritten.
 * Approach: 1. `insert`: delta = val - previous from `keyToValueMap`; walk the key, creating `TrieNode`s, add delta to each `pathSum`. 2. `sum`: walk the prefix; missing child → 0, else return that node’s `pathSum`.
 * Dry Run: insert("apple",3) then sum("ap")=3. insert("app",2): delta=2 along a,p,p. sum("ap")=5.
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
