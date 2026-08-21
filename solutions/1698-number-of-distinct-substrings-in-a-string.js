/**
 * Number Of Distinct Substrings In A String
 * Intuition: Every unique path from the trie root is a distinct substring. Insert all suffixes; a new child node means a new substring.
 * Approach: 1. For each `currentStartIndex`, walk from `rootNode` adding `s[currentEndIndex]`. 2. If `childPointers[offset]` is null, allocate a node and increment `distinctSubstringsFound`. 3. Return the count.
 * Dry Run: s = "aabb"
 * Trie inserts create 8 new nodes: a, aa, aab, aabb, ab, abb, b, bb.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var countDistinct = function (s) {
  class TrieNode {
    constructor() {
      this.childPointers = new Array(26).fill(null);
    }
  }

  const rootNode = new TrieNode();
  let distinctSubstringsFound = 0;
  const inputStringLength = s.length;

  for (
    let currentStartIndex = 0;
    currentStartIndex < inputStringLength;
    currentStartIndex++
  ) {
    let currentNode = rootNode;
    for (
      let currentEndIndex = currentStartIndex;
      currentEndIndex < inputStringLength;
      currentEndIndex++
    ) {
      const charCharacterCodeOffset =
        s.charCodeAt(currentEndIndex) - "a".charCodeAt(0);
      if (currentNode.childPointers[charCharacterCodeOffset] === null) {
        currentNode.childPointers[charCharacterCodeOffset] = new TrieNode();
        distinctSubstringsFound++;
      }
      currentNode = currentNode.childPointers[charCharacterCodeOffset];
    }
  }

  return distinctSubstringsFound;
};
