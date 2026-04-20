/**
 * Implement Trie Prefix Tree
 * Time Complexity: O(L)
 * Space Complexity: O(S)
 */
var Trie = function () {
  this.rootNode = {};
};

Trie.prototype.insert = function (wordToInsert) {
  let currentTriePosition = this.rootNode;
  for (const characterValue of wordToInsert) {
    if (!currentTriePosition[characterValue]) {
      currentTriePosition[characterValue] = {};
    }
    currentTriePosition = currentTriePosition[characterValue];
  }
  currentTriePosition.isCompleteWord = true;
};

Trie.prototype.getEndOfPathNode = function (inputPath) {
  let traversalAnchor = this.rootNode;
  for (let charIndex = 0; charIndex < inputPath.length; charIndex++) {
    let charAtCurrentIndex = inputPath[charIndex];
    if (!traversalAnchor[charAtCurrentIndex]) {
      return null;
    }
    traversalAnchor = traversalAnchor[charAtCurrentIndex];
  }
  return traversalAnchor;
};

Trie.prototype.search = function (queryWord) {
  const foundNode = this.getEndOfPathNode(queryWord);
  return foundNode != null && foundNode.isCompleteWord === true;
};

Trie.prototype.startsWith = function (queryPrefix) {
  const prefixEndNode = this.getEndOfPathNode(queryPrefix);
  return prefixEndNode !== null;
};
