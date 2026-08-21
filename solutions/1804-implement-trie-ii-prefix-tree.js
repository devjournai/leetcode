/**
 * Implement Trie II Prefix Tree
 * Intuition: Each node stores `wordCount` (words ending here) and `prefixCount` (words passing through) so insert, equal-to, starts-with, and erase are O(length).
 * Approach: 1. Root is `{children, wordCount, prefixCount}`. 2. `insert` creates nodes and increments prefixCount on each step, wordCount at the end. 3. Count methods walk the path or return 0. 4. `erase` decrements prefixCount along the word and wordCount at the leaf.
 * Dry Run: insert "apple" twice, insert "app". countWordsEqualTo("apple")=2, countWordsStartingWith("app")=3, erase "apple" → equal 1 and prefix 2.
 * Time Complexity: O(L)
 * Space Complexity: O(TotalNodes * AlphabetSize)
 */
var Trie = function () {
  this.root = { children: {}, wordCount: 0, prefixCount: 0 };
};

Trie.prototype.insert = function (word) {
  let currentPosition = this.root;
  for (const currentCharacter of word) {
    if (!currentPosition.children[currentCharacter]) {
      currentPosition.children[currentCharacter] = {
        children: {},
        wordCount: 0,
        prefixCount: 0,
      };
    }
    currentPosition = currentPosition.children[currentCharacter];
    currentPosition.prefixCount++;
  }
  currentPosition.wordCount++;
};

Trie.prototype.countWordsEqualTo = function (word) {
  let searchNode = this.root;
  for (const charToMatch of word) {
    if (!searchNode.children[charToMatch]) {
      return 0;
    }
    searchNode = searchNode.children[charToMatch];
  }
  return searchNode.wordCount;
};

Trie.prototype.countWordsStartingWith = function (prefix) {
  let traverseNode = this.root;
  for (const prefixChar of prefix) {
    if (!traverseNode.children[prefixChar]) {
      return 0;
    }
    traverseNode = traverseNode.children[prefixChar];
  }
  return traverseNode.prefixCount;
};

Trie.prototype.erase = function (word) {
  let removalNode = this.root;
  for (const charForRemoval of word) {
    removalNode = removalNode.children[charForRemoval];
    removalNode.prefixCount--;
  }
  removalNode.wordCount--;
};
