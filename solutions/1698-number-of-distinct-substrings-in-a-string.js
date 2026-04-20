/**
 * Number Of Distinct Substrings In A String
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
