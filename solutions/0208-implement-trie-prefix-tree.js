/**
 * Implement Trie Prefix Tree
 * Intuition: Nested objects keyed by character share prefixes. A flag on the terminal node distinguishes a complete word from a prefix-only path.
 * Approach: 1. insert walks/creates child objects and sets isCompleteWord. 2. getEndOfPathNode follows the path or returns null. 3. search succeeds only if that node exists and isCompleteWord. 4. startsWith succeeds if the path exists.
 * Dry Run: insert("app"), then search / startsWith.
 *   - Trie: root.a.p.p.isCompleteWord = true.
 *   - search("app") → node with flag → true; search("ap") → node without flag → false.
 *   - startsWith("ap") → node exists → true.
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
