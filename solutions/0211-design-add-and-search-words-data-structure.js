/**
 * Design Add And Search Words Data Structure
 * Intuition: A trie stores words; '.' in a query means try every child branch. DFS from the root matches the pattern.
 * Approach: 1. addWord inserts characters as nested objects and sets isEndOfWordFlag. 2. search DFS: at the end of the pattern, require the flag. 3. On '.', recurse into every child except the flag key. 4. On a letter, follow that child or fail.
 * Dry Run: addWord("bad"), search("b.d").
 *   - Trie: b → a → d (end).
 *   - 'b' follows b; '.' tries child a; 'd' follows d at end with flag → true.
 *   - search("pad") has no p child → false.
 * Time Complexity: O(L)
 * Space Complexity: O(N*L)
 */
var WordDictionary = function () {
  this.rootNode = {};
};

WordDictionary.prototype.addWord = function (wordInput) {
  let currentPosition = this.rootNode;

  for (const characterToAdd of wordInput) {
    if (!currentPosition[characterToAdd]) {
      currentPosition[characterToAdd] = {};
    }
    currentPosition = currentPosition[characterToAdd];
  }

  currentPosition.isEndOfWordFlag = true;
};

WordDictionary.prototype.search = function (searchInput) {
  const targetWordLength = searchInput.length;

  const recursiveSearch = (nodeToExplore, indexInWord) => {
    if (indexInWord === targetWordLength) {
      return nodeToExplore.isEndOfWordFlag === true;
    }

    const currentSearchChar = searchInput[indexInWord];

    if (currentSearchChar === ".") {
      for (const childIdentifier in nodeToExplore) {
        if (childIdentifier === "isEndOfWordFlag") {
          continue;
        }
        if (recursiveSearch(nodeToExplore[childIdentifier], indexInWord + 1)) {
          return true;
        }
      }
      return false;
    } else {
      const nextBranch = nodeToExplore[currentSearchChar];
      if (nextBranch) {
        return recursiveSearch(nextBranch, indexInWord + 1);
      } else {
        return false;
      }
    }
  };

  return recursiveSearch(this.rootNode, 0);
};
